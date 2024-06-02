#django
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser
from django.db import models

class MyUserManager(BaseUserManager):
    """
    User manager

    It handles how define and create the objects of the User. 

    Methods:
    - Create_user: It will create the user. If it doesn't have the email field fill, it will return an Error
    """

    def create_user(self, email, password=None):
        """
        Create user

        Parameter:
        - Email: User email
        - Password: User password

        return User with the email and password
        """
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            email=self.normalize_email(email),
        )

        user.set_password(password)
        user.save(using=self._db)
        return user
    


class User(AbstractBaseUser):
    """
    User

    It heritage of AbstractBaseUser to handle the authentication and manage of the sessions

    Attributes:
    - Email: Email
    - name : user name
    - photo_profile: Use photo
    """
    #
    email = models.EmailField(verbose_name='email address', max_length=255, unique=True)
    name = models.CharField(max_length=255)
    photo_profile = models.URLField(blank=True, null=True)

    #Instance of MyUserManager to handle this model
    objects = MyUserManager()

    #Username_field is email not username
    USERNAME_FIELD = 'email'


class Emails(models.Model):
    """
    Emails

    Parameters:
    - models.model: We heritage Model from models to use the django ORM for creating the table 
                    to use in this Email project

    recipient = The recipient id is where I send the email
    sender = Who sent the email
    subject: The subject of the email.
    body: The main text content of the email.
    timestamp: The date and time when the email was sent or received.
    """
    recipient = models.ForeignKey(User, related_name='received_emails', on_delete=models.CASCADE)
    sender = models.ForeignKey(User, related_name='sender_email', on_delete=models.CASCADE)
    subject = models.CharField(max_length=255)
    body = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
