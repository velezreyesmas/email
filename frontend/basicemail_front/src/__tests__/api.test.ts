import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { getEmails, postEmail, getUser, postUser, getPicture } from "../api";

const mock = new MockAdapter(axios);

// Test para emails
describe('getEmails', () => 
{
  test("getEmails makes a GET request correctly", async () => 
  {
    const currentUser = 'user1';
    const mockData = [{ id: 1, subject: 'Email Tests', body: 'Content' }];

    mock.onGet(`http://18.228.223.130:8000/api/recieve-email/${currentUser}`).reply(200, mockData);

    const response = await getEmails(currentUser);

    expect(response.data).toEqual(mockData);
  });
});

// POST emails
describe('postEmail', () => 
{
  test("postEmails makes a POST request correctly", async () =>
  {
    const subject = 'New mail';
    const email = 'destinatario@example.com';
    const body = 'Email Content';

    const mockData = { status: 'success' };

    mock.onPost('http://18.228.223.130:8000/api/send-email/').reply(200, mockData);

    const response = await postEmail(subject, email, body);

    expect(response.data).toEqual(mockData);
  });
});

// getUser Test
describe('getUser', () => 
{
  test('getUser makes an user GET correctly', async () => 
  {
    const email = 'usuario@example.com';
    const password = 'contraseña';

    const mockData = { id: 1, name: 'Test user' };

    mock.onPost('http://18.228.223.130:8000/api/login/').reply(200, mockData);

    const response = await getUser(email, password);

    expect(response.data).toEqual(mockData);
  });
});

// postUser Test
describe('postUser', () => 
{
  test('postUser makes an user POST correctly', async () => 
  {
    const name = 'Nuevo Usuario';
    const email = 'nuevoUsuario@example.com';
    const password = 'nuevaContraseña';
    const photo_profile = 'ruta/imagen.jpg';

    const mockData = { status: 'success' };

    mock.onPost('http://18.228.223.130:8000/api/register/').reply(200, mockData);

    const response = await postUser(name, email, password, photo_profile);

    expect(response.data).toEqual(mockData);
  });
});

// getPicture Test
describe('getPicture', () => 
{
  test('getPicture makes an image GET correctly', async () => 
  {
    const mockData = [{ id: 1, author: 'Autor de la imagen' }];

    mock.onGet('https://picsum.photos/v2/list').reply(200, mockData);

    const response = await getPicture();

    expect(response.data).toEqual(mockData);
  });

  afterEach(() => {
    mock.reset();
  });
});
