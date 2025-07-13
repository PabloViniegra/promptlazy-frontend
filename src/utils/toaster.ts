import { Check, X, AlertTriangle, Info } from 'lucide-vue-next'
import { h } from 'vue'
import { useRouter } from 'vue-router'
import ToastOptions from 'vue-sonner'

const router = useRouter()

interface ToastConfig extends Omit<typeof ToastOptions, 'class' | 'classes' | 'style' | 'action'> {
  class?: string
  classes?: {
    toast?: string
    title?: string
    description?: string
    actionButton?: string
    cancelButton?: string
    closeButton?: string
  }
  style?: Record<string, string>
  action?: {
    label: string
    onClick: () => void
    class?: string
    style?: Record<string, string>
  }
  icon?: () => ReturnType<typeof h>
  duration?: number
  description?: string
}

const baseToastConfig: ToastConfig = {
  class: 'toast-wrapper',
  duration: 4000,
  style: {
    padding: '0.75rem 1rem',
    borderRadius: '0.5rem',
    fontFamily: 'var(--font-sans)',
    borderLeft: '4px solid var(--color-primary)',
    transition: 'all 0.3s ease',
    boxShadow: 'var(--shadow-md)',
    background: 'hsl(var(--card))',
    color: 'hsl(var(--card-foreground))',
    border: '1px solid hsl(var(--border))',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
  },
  classes: {
    title: 'toast-title',
    description: 'toast-description',
    toast: 'toast',
  },
}

export const ToastProfileSuccessElimination: ToastConfig = {
  ...baseToastConfig,
  description: 'El prompt se ha eliminado correctamente',
  duration: 3000,
  class: `${baseToastConfig.class} toast-success`,
  icon: () => h(Check, { class: 'toast-icon' }),
}

export const ToastCredentialsSuccess: ToastConfig = {
  ...baseToastConfig,
  description: '¡Bienvenido de nuevo!',
  class: `${baseToastConfig.class} toast-welcome`,
  style: {
    ...baseToastConfig.style,
    background: 'linear-gradient(135deg, hsl(var(--primary) / 0.9), hsl(var(--secondary) / 0.9))',
    color: 'white',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  },
  icon: () => h(Check, { class: 'toast-icon' }),
  duration: 5000,
}

export const ToastRegisterSuccess: ToastConfig = {
  ...baseToastConfig,
  description: '¡Registro exitoso! Redirigiendo...',
  class: `${baseToastConfig.class} toast-success`,
  icon: () => h(Check, { class: 'toast-icon' }),
  duration: 3000,
}

export const ToastCopyPromptSuccess: ToastConfig = {
  ...baseToastConfig,
  description: 'El texto se ha copiado al portapapeles',
  duration: 2000,
  class: `${baseToastConfig.class} toast-success`,
  icon: () => h(Check, { class: 'toast-icon' }),
}

export const ToastProfileErrorElimination: ToastConfig = {
  ...baseToastConfig,
  description: 'Error al actualizar el perfil.',
  class: `${baseToastConfig.class} toast-error`,
  style: {
    ...baseToastConfig.style,
    borderLeft: '4px solid hsl(var(--destructive))',
    background: 'hsl(var(--destructive) / 0.05)',
    color: 'hsl(var(--destructive))',
    border: '1px solid hsl(var(--destructive) / 0.2)',
  },
  icon: () => h(X, { class: 'toast-icon' }),
}

export const ToastCredentialsError: ToastConfig = {
  ...ToastProfileErrorElimination,
  description: 'Credenciales incorrectas. Por favor, inténtalo de nuevo.',
  action: {
    label: '¿Olvidaste tu contraseña?',
    onClick: () => router.push('/forgot-password'),
    class: 'toast-action',
  },
}

export const ToastRegisterError: ToastConfig = {
  ...ToastProfileErrorElimination,
  description: 'Error al registrar el usuario. Por favor, inténtalo de nuevo.',
}

export const ToastCopyPromptError: ToastConfig = {
  ...ToastProfileErrorElimination,
  description: 'Error al copiar el texto. Inténtalo de nuevo.',
}

export const ToastProfileCurrentPasswordError: ToastConfig = {
  ...baseToastConfig,
  description: 'Debes ingresar tu contraseña actual para realizar cambios',
  class: `${baseToastConfig.class} toast-warning`,
  style: {
    ...baseToastConfig.style,
    borderLeft: '4px solid hsl(var(--warning))',
    background: 'hsl(var(--warning) / 0.05)',
    color: 'hsl(var(--warning-foreground))',
    border: '1px solid hsl(var(--warning) / 0.2)',
  },
  icon: () => h(AlertTriangle, { class: 'toast-icon' }),
}

export const ToastProfileRequiredFieldsError: ToastConfig = {
  ...ToastProfileCurrentPasswordError,
  description: 'Por favor, completa todos los campos obligatorios',
}

export const ToastPromptUpdateSuccess: ToastConfig = {
  ...baseToastConfig,
  description: 'El prompt se ha actualizado correctamente',
  class: `${baseToastConfig.class} toast-info`,
  style: {
    ...baseToastConfig.style,
    borderLeft: '4px solid hsl(var(--accent))',
    background: 'hsl(var(--accent) / 0.05)',
    color: 'hsl(var(--accent-foreground))',
    border: '1px solid hsl(var(--accent) / 0.2)',
  },
  icon: () => h(Info, { class: 'toast-icon' }),
}

export const ToastPromptEliminationSuccess: ToastConfig = {
  ...ToastPromptUpdateSuccess,
  description: 'El prompt se ha eliminado correctamente',
}

export const ToastWithAction = (action: () => void, actionLabel = 'Deshacer'): ToastConfig => ({
  ...baseToastConfig,
  description: 'Acción realizada con éxito',
  class: `${baseToastConfig.class} toast-success`,
  icon: () => h(Check, { class: 'toast-icon' }),
  action: {
    label: actionLabel,
    onClick: action,
    class: 'toast-action',
  },
})
