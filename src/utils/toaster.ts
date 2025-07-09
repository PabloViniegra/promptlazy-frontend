import { Check } from 'lucide-vue-next'
import { h } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

export const ToastProfileSuccessElimination = {
  description: 'El prompt se ha eliminado correctamente',
  duration: 3000,
  class: 'group/toast',
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
    title: 'font-medium text-foreground flex items-center gap-2',
    description: 'text-sm text-muted-foreground',
    toast:
      'group-[.toaster]:animate-in group-[.toaster]:fade-in group-[.toaster]:slide-in-from-bottom-2 group-[.toaster]:duration-300',
  },
}

export const ToastProfileErrorElimination = {
  description: 'Error al actualizar el perfil.',
  duration: 4000,
  class: 'group/toast',
  style: {
    padding: '0.75rem 1rem',
    borderRadius: '0.5rem',
    fontFamily: 'var(--font-sans)',
    borderLeft: '4px solid hsl(var(--destructive))',
    transition: 'all 0.3s ease',
    boxShadow: 'var(--shadow-md)',
    background: 'hsl(var(--card))',
    color: 'hsl(var(--card-foreground))',
    border: '1px solid hsl(var(--destructive)/0.3)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
  },
  classes: {
    title: 'font-medium text-foreground flex items-center gap-2',
    description: 'text-sm text-muted-foreground',
    toast:
      'group-[.toaster]:animate-in group-[.toaster]:fade-in group-[.toaster]:slide-in-from-bottom-2 group-[.toaster]:duration-300',
  },
}

export const ToastProfileCurrentPasswordError = {
  description: 'Debes ingresar tu contraseña actual para realizar cambios',
  duration: 4000,
  class: 'group/toast',
  style: {
    padding: '0.75rem 1rem',
    borderRadius: '0.5rem',
    fontFamily: 'var(--font-sans)',
    borderLeft: '4px solid hsl(var(--warning))',
    transition: 'all 0.3s ease',
    boxShadow: 'var(--shadow-md)',
    background: 'hsl(var(--card))',
    color: 'hsl(var(--card-foreground))',
    border: '1px solid hsl(var(--warning)/0.3)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
  },
  classes: {
    title: 'font-medium text-foreground flex items-center gap-2',
    description: 'text-sm text-muted-foreground',
    toast:
      'group-[.toaster]:animate-in group-[.toaster]:fade-in group-[.toaster]:slide-in-from-bottom-2 group-[.toaster]:duration-300',
  },
}

export const ToastProfileRequiredFieldsError = {
  description: 'Por favor, completa todos los campos obligatorios',
  duration: 4000,
  class: 'group/toast',
  style: {
    padding: '0.75rem 1rem',
    borderRadius: '0.5rem',
    fontFamily: 'var(--font-sans)',
    borderLeft: '4px solid hsl(var(--warning))',
    transition: 'all 0.3s ease',
    boxShadow: 'var(--shadow-md)',
    background: 'hsl(var(--card))',
    color: 'hsl(var(--card-foreground))',
    border: '1px solid hsl(var(--warning)/0.3)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
  },
  classes: {
    title: 'font-medium text-foreground flex items-center gap-2',
    description: 'text-sm text-muted-foreground',
    toast:
      'group-[.toaster]:animate-in group-[.toaster]:fade-in group-[.toaster]:slide-in-from-bottom-2 group-[.toaster]:duration-300',
  },
}

export const ToastPromptEliminationSuccess = {
  description: 'El prompt ha sido eliminado correctamente',
  duration: 3000,
  style: {
    background: 'hsl(142.1 76.2% 36.3%)',
    color: 'white',
    border: 'none',
    borderRadius: '0.5rem',
    padding: '1rem',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  },
}

export const ToastPromptEliminationError = {
  description: 'No se pudo eliminar el prompt. Inténtalo de nuevo.',
  duration: 4000,
  style: {
    background: 'hsl(0 84.2% 60.2%)',
    color: 'white',
    border: 'none',
    borderRadius: '0.5rem',
    padding: '1rem',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  },
}

export const ToastPromptUpdateSuccess = {
  description: 'El prompt ha sido actualizado correctamente',
  duration: 3000,
  style: {
    background: 'hsl(142.1 76.2% 36.3%)',
    color: 'white',
    border: 'none',
    borderRadius: '0.5rem',
    padding: '1rem',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  },
}

export const ToastPromptUpdateError = {
  description: 'No se pudo actualizar el prompt. Inténtalo de nuevo.',
  duration: 4000,
  style: {
    background: 'hsl(0 84.2% 60.2%)',
    color: 'white',
    border: 'none',
    borderRadius: '0.5rem',
    padding: '1rem',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  },
}

export const ToastCopyPromptSuccess = {
  description: 'El texto se ha copiado al portapapeles',
  duration: 2000,
  class: 'group/toast',
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
  icon: () => h(Check, { class: 'h-5 w-5 text-green-500' }),
  classes: {
    title: 'font-medium text-foreground flex items-center gap-2',
    description: 'text-sm text-muted-foreground',
    toast:
      'group-[.toaster]:animate-in group-[.toaster]:fade-in group-[.toaster]:slide-in-from-bottom-2 group-[.toaster]:duration-300',
  },
}

export const ToastCopyPromptError = {
  description: 'No se pudo copiar el texto',
  duration: 2000,
  class: 'group/toast',
  style: {
    padding: '0.75rem 1rem',
    borderRadius: '0.5rem',
    fontFamily: 'var(--font-sans)',
    borderLeft: '4px solid hsl(var(--destructive))',
    transition: 'all 0.3s ease',
    boxShadow: 'var(--shadow-md)',
    background: 'hsl(var(--destructive)/0.03)',
    color: 'hsl(var(--destructive))',
    border: '1px solid hsl(var(--destructive)/0.1)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
  },
  classes: {
    title: 'font-medium flex items-center gap-2',
    description: 'text-sm text-muted-foreground/90',
    toast:
      'group-[.toaster]:animate-in group-[.toaster]:fade-in group-[.toaster]:slide-in-from-bottom-2 group-[.toaster]:duration-300',
  },
}

export const ToastCredentialsError = {
  class: 'group/toast',
  description: 'Las credenciales proporcionadas no son válidas. Por favor, verifica e inténtalo de nuevo.',
  duration: 6000,
  style: {
    padding: '1rem 1.25rem',
    borderRadius: '0.75rem',
    fontFamily: 'var(--font-sans)',
    borderLeft: '4px solid hsl(var(--destructive))',
    transition: 'all 0.3s ease',
    boxShadow: 'var(--shadow-md)',
    background: 'hsl(var(--destructive)/0.03)',
    color: 'hsl(var(--destructive))',
    border: '1px solid hsl(var(--destructive)/0.1)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)'
  },
  classes: {
    title: 'font-semibold text-base flex items-center gap-2',
    description: 'text-sm text-muted-foreground/90 mt-1',
    toast: 'group-[.toaster]:animate-in group-[.toaster]:fade-in group-[.toaster]:slide-in-from-bottom-2 group-[.toaster]:duration-300',
  },
  action: {
    label: '¿Olvidaste tu contraseña?',
    onClick: () => router.push('/forgot-password'),
    style: {
      background: 'hsl(var(--destructive)/0.1)',
      color: 'hsl(var(--destructive))',
      border: '1px solid hsl(var(--destructive)/0.2)',
      padding: '0.25rem 0.75rem',
      borderRadius: '0.375rem',
      fontSize: '0.75rem',
      marginTop: '0.5rem',
      fontWeight: 500,
      transition: 'all 0.2s ease',
      ':hover': {
        background: 'hsl(var(--destructive)/0.2)'
      }
    }
  }
}

export const ToastCredentialsSuccess = {
  class: 'group/toast',
  description: 'Inicio de sesión exitoso. Redirigiendo a tu panel...',
  duration: 3000,
  style: {
    padding: '1rem 1.25rem',
    borderRadius: '0.75rem',
    fontFamily: 'var(--font-sans)',
    borderLeft: '4px solid hsl(var(--primary))',
    transition: 'all 0.3s ease',
    boxShadow: 'var(--shadow-md)',
    background: 'hsl(var(--card))',
    color: 'hsl(var(--card-foreground))',
    border: '1px solid hsl(var(--border))',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)'
  },
  classes: {
    title: 'font-semibold text-base text-foreground',
    description: 'text-sm text-muted-foreground mt-1',
    toast: 'group-[.toaster]:animate-in group-[.toaster]:fade-in group-[.toaster]:slide-in-from-bottom-2 group-[.toaster]:duration-300',
  }
}

export const ToastRegisterError = {
  class: 'group/toast',
  description: 'No hemos podido completar tu registro. Por favor, verifica tus datos e inténtalo de nuevo.',
  duration: 6000,
  style: {
    padding: '1rem 1.25rem',
    borderRadius: '0.75rem',
    fontFamily: 'var(--font-sans)',
    borderLeft: '4px solid hsl(var(--destructive))',
    transition: 'all 0.3s ease',
    boxShadow: 'var(--shadow-md)',
    background: 'hsl(var(--destructive)/0.03)',
    color: 'hsl(var(--destructive))',
    border: '1px solid hsl(var(--destructive)/0.1)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)'
  },
  classes: {
    title: 'font-semibold text-base flex items-center gap-2',
    description: 'text-sm text-muted-foreground/90 mt-1',
    toast: 'group-[.toaster]:animate-in group-[.toaster]:fade-in group-[.toaster]:slide-in-from-bottom-2 group-[.toaster]:duration-300',
  }
}

export const ToastRegisterSuccess = {
  class: 'group/toast',
  description: '¡Bienvenido a PromptLazy! Estamos encantados de tenerte aquí.',
  duration: 5000,
  style: {
    padding: '1rem 1.25rem',
    borderRadius: '0.75rem',
    fontFamily: 'var(--font-sans)',
    borderLeft: '4px solid var(--color-primary)',
    transition: 'all 0.3s ease',
    boxShadow: 'var(--shadow-md)',
    background: 'hsl(var(--card))',
    color: 'hsl(var(--card-foreground))',
    border: '1px solid hsl(var(--border))',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)'
  },
  classes: {
    title: 'font-semibold text-base text-foreground',
    description: 'text-sm text-muted-foreground mt-1',
    toast: 'group-[.toaster]:animate-in group-[.toaster]:fade-in group-[.toaster]:slide-in-from-bottom-2 group-[.toaster]:duration-300',
  }
}
