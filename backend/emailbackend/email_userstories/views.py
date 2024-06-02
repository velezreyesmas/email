#Backend
from .models import Emails
from .serializers import EmailSendSerializer, EmailRecieveSerializer, RegisterUserSerializer, LoginUserSerializer

#django
from django.contrib.auth import get_user_model
from django.core.exceptions import ObjectDoesNotExist


#rest-framework
from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.views import APIView


class RegisterUserView(generics.CreateAPIView):
    """
    Register View

    This view handles the registration of a new user. It accepts a POST request containing user data,
    validates this data using the RegisterUserSerializer, and then saves the new user to the database.

    Attributes:
        - serializer_class: The serializer class for this view will use to validate and deserialize input, and to serialize output.

    Methods:
        - Post(request): Handles a POST request. It creates a new serializer with the data from the request, 
          validates the data, and then saves the validated data as a new user in the database.
    """
    #Specify the serializer class
    serializer_class = RegisterUserSerializer

    def post(self, request):
        """
        Post from a request.

        Parameters:
        - request: the request.data should contain the user data to be validated and saved
        
        Return:
            - A Response object  with the serialized data of the newly created user and a status code indicating the success of the operation.
              If the operation was succesful, the status code will be 201 CREATED.
        """
        #Save the data of serializer
        serializer = self.get_serializer(data=request.data)
        #Validate the data. if the data is invalid, a 400 BAD REQUEST respoonse will be raised
        serializer.is_valid(raise_exception=True)
        #If serializer has data it store that data in the database
        self.perform_create(serializer)
        #Headers will have the data saved
        headers = self.get_success_headers(serializer.data)
        # Return a 201 CREATED response with the serialized data of the new user
        return Response (serializer.data, status=status.HTTP_201_CREATED, headers= headers)
    

class LoginUserView(generics.GenericAPIView):
    """
    LoginUserView

    This view handles the login process for a user. It accepts a POST request containing the user's email and password,
    validates these credentials, and then logs in the user by storing their user ID in the session.

    Attributes:
        - serializer_class: The serializer class that this view will use to validate and deserialize input, 
          and to serialize output.

    Methods:
        - post(request, *args, **kwargs): Handles a POST request. It retrieves the email and password from the request data,
          attempts to retrieve a user with the given email, checks if the password is correct, and then logs in the user by
          storing their user ID in the session.
        - get(request): Handles a GET request. It retrieves the user ID from the session, attempts to retrieve a user with
          the given user ID, and then returns a response with the serialized data of the user and their received emails.
    """
    #The serialize class will be LoginUserSerializer 
    serializer_class = LoginUserSerializer

    def post(self, request):
        """
        Handles a POST request.

        Parameters:
            - request: The request that triggered this method. The request.data should contain the user's email and password.

        Returns:
            - A Response object with a message indicating the success or failure of the login process, and the serialized data
              of the user if the login was successful. If the login was successful, the status code will be 200 OK. If the login
              failed, the status code will be 404 NOT FOUND.
        """
        
        email = request.data.get('email')
        password = request.data.get('password')
        print(f'email log in {email}, password log in {password}')
        User = get_user_model()

        #Validate if the email exist or no.
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            user = None

        #If the user exist and password of the user.password is equal so it will access to that account
        if user is not None and user.password == password:
            #The session will be the user in this case with his email and its ID
            request.session['user'] = user.id
            print("Session in login" , request.session['user'])
            
            #It will response a message with the data serialized and a status code
            return Response({"detail": "User logged in successfully", 'user': LoginUserSerializer(user).data}, status=status.HTTP_200_OK)
        return Response({"detail": "Invalid Credentials"}, status=status.HTTP_404_NOT_FOUND)

    def get(self, request):
        """
        Handles a GET request.

        Parameters:
            - request: The request that triggered this method.

        Returns:
            - A Response object with the serialized data of the user and their received emails if a user is logged in. If no user
              is logged in, the response will contain a message indicating this and the status code will be 400 BAD REQUEST. If the
              user does not exist, the response will contain a message indicating this and the status code will be 404 NOT FOUND.
        """
        
        #Validate if the session of the user exist
        user_id = request.session.get('user')
        print(f"user id get of login: {user_id}")
        if user_id is None:
            return Response({"detail": "No user logged in"}, status=status.HTTP_400_BAD_REQUEST)

        #This is the model to use
        User = get_user_model()
        #Search the user in the database
        try:
            user = User.objects.get(id=user_id)
            user_data = LoginUserSerializer(user).data
            received_emails = Emails.objects.filter(recipient_id=user_id)
            received_emails_data = EmailRecieveSerializer(received_emails, many=True).data
            return Response({
                'user': user_data,
                'received_emails': received_emails_data,
            })
        #If user doesn't exist it response a 404 NOT FOUND
        except ObjectDoesNotExist:
            return Response({"detail": "User not found in get"}, status=status.HTTP_404_NOT_FOUND)
        
class LogoutView(APIView):
    def post(self, request):
        """
        Handles a POST request to log out the user.

        Parameters:
            - request: The request that triggered this method.

        Returns:
            - A Response object with a message indicating the success or failure of the logout process. If the logout was successful, the status code will be 200 OK. If the logout failed, the status code will be 400 BAD REQUEST.
        """
        # Validate if the session of the user exist
        user_id = request.session.get('user')
        print(f'user id logout {user_id}')
        if user_id is None:
            return Response({"detail": "No user logged in"}, status=status.HTTP_400_BAD_REQUEST)

        # This is the model to use
        User = get_user_model()
        # Check if the user exists in the database
        if User.objects.filter(id=user_id).exists():
            # Delete the user session
            del request.session['user']
            return Response({"detail": "User logged out successfully"}, status=status.HTTP_200_OK)
        # If user doesn't exist it response a 404 NOT FOUND
        else:
            return Response({"detail": "User not found in post"}, status=status.HTTP_404_NOT_FOUND)
        



class SendEmailView(generics.CreateAPIView):
    """
    SendEmailView

    This view handles the process of sending an email. It accepts a POST request containing the recipient's email, 
    subject, and body of the email, validates these inputs, and then creates a new email in the database.

    Attributes:
        - serializer_class: The serializer class that this view will use to validate and deserialize input, 
          and to serialize output.

    Methods:
        - create(request, *args, **kwargs): Handles a POST request. It retrieves the sender from the session, 
          the recipient, subject, and body from the request data, creates a new email with these data, and then 
          saves the new email to the database.
    """
    serializer_class = EmailSendSerializer

    def create(self, request, *args, **kwargs):
        """
        Handles a POST request.

        Parameters:
            - request: The request that triggered this method. The request.data should contain the recipient's email, 
              subject, and body of the email.

        Returns:
            - A Response object with a message indicating the success of the email sending process, and a status code 
              indicating the success of the operation. If the operation was successful, the status code will be 201 CREATED.
        """
        #Validate if user session is ongoing 
        user_id = request.session.get('user')
        print(f'send email user id: {user_id}')
        if user_id is None:
            return Response({"detail":"No user logged in. Please log in to send an email."}, status=status.HTTP_400_BAD_REQUEST)

        #Validate if the user_id has email
        try:
            sender = get_user_model().objects.get(id=user_id)
        except get_user_model().DoesNotExist:
            return Response({"detail":"Sender not logged in"}, status=status.HTTP_404_NOT_FOUND)

        #Validate the recipient email from the request
        recipient_id = request.data.get('recipient_email')
        if recipient_id is None:
            return Response({"detail":"Recipient email is required."}, status=status.HTTP_400_BAD_REQUEST)
        try:
            recipient = get_user_model().objects.get(email=recipient_id)
        except get_user_model().DoesNotExist:
            return Response({"detail":"Recipient not found"}, status=status.HTTP_404_NOT_FOUND)
        
        #Data to deserialize and save in the data base
        subject = request.data.get('subject')
        body = request.data.get('body')
        email = Emails.objects.create(sender=sender, recipient=recipient, subject=subject, body=body)
        email. save()
        return Response({'detail': ' Email sent succesfully'}, status=status.HTTP_201_CREATED)


class RecievedEmailView(generics.ListAPIView):
    """
    RecievedEmailView

    This view handles the process of retrieving the emails received by the logged-in user. It accepts a GET request, 
    retrieves the user from the session, and then retrieves all emails where the recipient is the user.

    Attributes:
        - serializer_class: The serializer class that this view will use to serialize output.

    Methods:
        - get_queryset(): Retrieves the queryset that should be used for list views, and that should be used as the 
          base for lookups in detail views. In this case, it retrieves all emails where the recipient is the user.
    """
    serializer_class = EmailRecieveSerializer

    def list(self, request, *args, **kwargs):
        """
        Overrides the list method of the ListAPIView.

        This method is called when a GET request is made. It checks if a user is logged in. If a user is logged in, 
        it calls the list method of the superclass, otherwise it returns a 400 BAD REQUEST response.

        Parameters:
            - request: The request that triggered this method.

        Returns:
            - A Response object with a message indicating the success or failure of the logout process. If the logout was successful, the status code will be 200 OK. If the logout failed, the status code will be 400 BAD REQUEST.
        """
        # Check if a user session exists
        user_id = request.session.get('user')
        print(f'user_id receive email: {user_id}')
        if user_id is None:
            return Response([], status=status.HTTP_200_OK)
        # If a user session exists, call the list method of the superclass
        return super().list(request, *args, **kwargs)

    def get_queryset(self):
        """
        Retrieves the queryset of emails received by the logged-in user.

        Returns:
            - A queryset of Emails objects where the recipient is the logged-in user.
        """
        # Get the user id from the session
        user_id = self.request.session.get('user')
        # Return the emails where the recipient is the user
        return Emails.objects.filter(recipient_id=user_id)