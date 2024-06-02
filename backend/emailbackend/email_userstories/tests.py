#local
import json
from email_userstories.models import Emails, User
from email_userstories.serializers import RegisterUserSerializer
#django
from django.test import TestCase, Client
from django.urls import reverse
from django.contrib.auth import get_user_model

#rest-framework
from rest_framework import status
# Create your tests here.

class RegisterUserViewTest(TestCase):
    """
    Test for RegisterUserView
    """
    def setUp(self):
        """
        Initialize the data to be tested, with 2 payload one valid, another invalid.
        """
        self.client = Client()
        self.valid_payload = {
            'name': 'testuser',
            'email': 'testuser@test.com',
            'password': 'testpassword'
        }
        self.invalid_payload = {
            'name': '',
            'email': '',
            'password': 'testpassword'
        }

    def test_register_user(self):
        data = {
            "name": "testuser",
            "email": "test@example.com",
            "password": "testpassword"
        }

        response = self.client.post('/api/register/', data, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(get_user_model().objects.count(), 1)
        self.assertEqual(get_user_model().objects.get().email, 'test@example.com')

    def test_register_valid_user(self):
        """
        This test will use a POST request in the URL with the valid payload and return 201 CREATED
        """
        response = self.client.post(
            reverse('register'),
            data=self.valid_payload,
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_register_invalid_user(self):
        """
        This test will use a POST request, and use the payload invalid returning an error 400 BAD_REQUEST
        """
        response = self.client.post(
            reverse('register'),
            data=self.invalid_payload,
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class LoginUserViewTest(TestCase):
    """
    Test for LoginUserView
    """
    def setUp(self):
        self.client = Client()
        self.valid_payload = {
            'email': 'testuser@test.com',
            'password': 'testpassword'
        }
        self.invalid_payload = {
            'email': 'wronguser@test.com',
            'password': 'testpassword'
        }

    # def test_login_valid_user(self):
    #     self.client(email='testuser@test.com', password='testpassword')
    #     response = self.client.post(
    #         reverse('login'),
    #         data=self.valid_payload,
    #         format='json'
    #     )
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_login_invalid_user(self):
        response = self.client.post(
            reverse('login'),
            data=self.invalid_payload,
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    # def test_get_logged_in_user(self):
    #     self.client.login(email='testuser@test.com', password='testpassword')
    #     response = self.client.get(reverse('login'))
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_not_logged_in_user(self):
        response = self.client.get(reverse('login'))
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
