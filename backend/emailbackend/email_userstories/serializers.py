#Local
from email_userstories.models import Emails, User

#django
from django.contrib.auth import get_user_model

#rest-framewor
from rest_framework import serializers


class EmailSendSerializer(serializers.ModelSerializer):
    """
    EmailSendSerializer
    
    It will send an Email

    Attributes:
        - recipient_email: This will use emails that are in the db and display them in a list to choose one of them
        - Meta.model: Class of the model to serialize
        - Meta.fields: Fields of the model Emails are included in the serialized representation.

    Methods:
        - create(validaded_data): It will create a new instance of the Emails model.
          This will get the recipient email with the data validated,
          and an User objecto to use and create the Emails object.      
    Métodos:
        - create(validated_data): Crea una nueva instancia del modelo Emails.
          Extrae el correo electrónico del destinatario de los datos validados,
          obtiene el objeto User correspondiente y lo usa para crear el objeto Emails.

    """
    #recipient_email = serializers.ChoiceField(choices=[(user.email, user.email) for user in get_user_model().objects.all()])
    recipient_email = serializers.CharField()


    class Meta:
        model = Emails
        fields = ['recipient_email','subject', 'body', 'timestamp']

    def create(self, validated_data):
        #Validate the data or recipient_email
        recipient_email = validated_data.pop('recipient_email')
        #It will use from the Email the email column and will pass the recipient_email to compare and see if it exists
        recipient = get_user_model().objects.get(email=recipient_email)
        #If this workds it will create the object recipient with the information of the data from the request.
        return Emails.objects.create(recipient=recipient, **validated_data)


class EmailRecieveSerializer(serializers.ModelSerializer):
    """
    Email Receive

    This is for receive email

    Attributes:
    - Meta.model = User class
    - Meta.field = The fields to serialize are email, name, password and photo_profile
    """
    sender_name = serializers.SerializerMethodField()
    sender_photo = serializers.SerializerMethodField()
    sender_email = serializers.SerializerMethodField()

    class Meta:
        model = Emails
        fields = ['sender_id', 'sender_name', 'sender_email','sender_photo', 'subject','body','timestamp']

    def get_sender_name(self, obj):
        user = User.objects.get(id=obj.sender_id)
        return user.name

    def get_sender_email(self, obj):
        user = User.objects.get(id=obj.sender_id)
        return user.email
        

    def get_sender_photo(self, obj):
        user = User.objects.get(id=obj.sender_id)
        return user.photo_profile


class LoginUserSerializer(serializers.ModelSerializer):
    """
    Login User

    This is for log in a user

    Attributes:
    - Meta.model = User
    - Meta.field = The fields to serialize are email and password    
    """
    class Meta:
        model = User
        fields = ['email', 'name' ,'password', 'photo_profile']

class RegisterUserSerializer(serializers.ModelSerializer):
    """
    Register User

    This is for Register a User

    Attributes:
    - Meta.model = User
    - Meta.model = The fields to serialize are name, email,password, photo_profile
    """

    class Meta:
        model= User
        fields = ['name', 'email','password','photo_profile']

    
