/**
 * Servicio de autenticación
 * Maneja login, logout, registro y gestión de tokens
 */

const API_URL = 'http://localhost:8000/api'

export const authService = {
  /**
   * Registro de nuevo usuario
   */
  async register(userId, password = '', email = '', fullName = '') {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          user_id: userId, 
          password,
          email: email || null,
          full_name: fullName || null
        })
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.detail || 'Registration failed')
      }

      const data = await response.json()
      
      // Guardar token en localStorage
      if (data.access_token) {
        localStorage.setItem('token', data.access_token)
        localStorage.setItem('user_id', userId)
      }

      return data
    } catch (error) {
      console.error('Registration error:', error)
      throw error
    }
  },

  /**
   * Login de usuario
   */
  async login(userId, password = '') {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: userId, password })
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.detail || 'Login failed')
      }

      const data = await response.json()
      
      // Guardar token en localStorage
      if (data.access_token) {
        localStorage.setItem('token', data.access_token)
        localStorage.setItem('user_id', userId)
      }

      return data
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  },

  /**
   * Logout de usuario
   */
  async logout() {
    const token = localStorage.getItem('token')
    
    if (!token) {
      // No hay token, solo limpiar localStorage
      localStorage.removeItem('token')
      localStorage.removeItem('user_id')
      return { success: true }
    }

    try {
      const response = await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      // Limpiar localStorage independientemente de la respuesta
      localStorage.removeItem('token')
      localStorage.removeItem('user_id')

      if (!response.ok) {
        console.warn('Logout endpoint failed, but local session cleared')
      }

      return { success: true }
    } catch (error) {
      console.error('Logout error:', error)
      // Igual limpiar localStorage aunque falle el endpoint
      localStorage.removeItem('token')
      localStorage.removeItem('user_id')
      return { success: true }
    }
  },

  /**
   * Obtener información del usuario actual
   */
  async getCurrentUser() {
    const token = localStorage.getItem('token')
    
    if (!token) {
      throw new Error('No token found')
    }

    try {
      const response = await fetch(`${API_URL}/auth/me`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error('Failed to get user info')
      }

      return await response.json()
    } catch (error) {
      console.error('Get current user error:', error)
      throw error
    }
  },

  /**
   * Verificar si hay sesión activa
   */
  isAuthenticated() {
    return !!localStorage.getItem('token')
  },

  /**
   * Obtener token actual
   */
  getToken() {
    return localStorage.getItem('token')
  },

  /**
   * Obtener user_id actual
   */
  getUserId() {
    return localStorage.getItem('user_id')
  }
}