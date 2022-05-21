const API_URL = 'https://localhost:7046/api';

export async function getAllCategories() {
  const response = await fetch(`${API_URL}/categories/all`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Błąd podczas pobierania kategorii');
  }
  return data;
}

export async function addCategory(categoryData) {
  const response = await fetch(`${API_URL}/categories/add`, {
    method: 'POST',
    body: JSON.stringify(categoryData),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Błąd podczas dodawania kategorii');
  }

  return null;
}

export async function updateCategory(categoryData) {
  const response = await fetch(`${API_URL}/categories/update`, {
    method: 'PUT',
    body: JSON.stringify(categoryData),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Błąd podczas aktualizowania kategorii');
  }

  return null;
}

export async function deleteCategory(categoryId) {
  const response = await fetch(`${API_URL}/categories/delete/${categoryId}`, {
    method: 'DELETE'
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Błąd podczas usuwania kategorii');
  }

  return null;
}