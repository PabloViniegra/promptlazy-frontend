<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'

const router = useRouter()

const goHome = () => {
  router.push('/')
}

const goBack = () => {
  router.go(-1)
}
</script>
<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted/20 p-4 text-center">
    <div class="max-w-3xl w-full space-y-8">
      <div class="relative h-64 md:h-80 w-full flex items-center justify-center">
        <div class="relative z-10 animate-bounce">
          <div class="w-24 h-24 md:w-32 md:h-32 bg-foreground/5 rounded-full border-2 border-foreground/10 flex items-center justify-center mx-auto mb-2">
            <div class="w-4 h-4 bg-blue-500 rounded-full mr  -2 animate-pulse"></div>
            <div class="w-4 h-4 bg-blue-500 rounded-full ml-2 animate-pulse" style="animation-delay: 0.3s"></div>
          </div>
          <div class="w-32 h-40 md:w-40 md:h-48 bg-foreground/5 rounded-lg border-2 border-foreground/10 mx-auto relative">
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="text-4xl font-bold text-foreground/70">404</div>
            </div>
            <div class="absolute -bottom-6 left-1/2 -translate-x-1/2 w-24 h-2 bg-foreground/20 rounded-full"></div>
            <div class="absolute top-1/4 -left-4 w-6 h-12 bg-foreground/10 rounded-full transform -rotate-12 origin-right"></div>
            <div class="absolute top-1/4 -right-4 w-6 h-12 bg-foreground/10 rounded-full transform rotate-12 origin-left"></div>
          </div>
        </div>
        <div class="absolute top-0 left-1/2 -translate-x-1/2">
          <div v-for="i in 5" :key="i"
               class="absolute w-2 h-2 bg-foreground/30 rounded-full"
               :style="{
                 left: `${Math.random() * 60 - 30}px`,
                 animation: `fall ${1 + Math.random() * 2}s linear infinite`,
                 animationDelay: `${Math.random() * 1}s`,
                 opacity: 0.5
               }">
          </div>
        </div>
      </div>
      <div class="space-y-4">
        <h1 class="text-4xl md:text-5xl font-bold font-heading bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
          ¡Ups! Página no encontrada
        </h1>
        <p class="text-foreground/70 text-lg max-w-2xl mx-auto">
          Parece que nuestro robot se ha caído por un agujero. No te preocupes, te ayudamos a volver a casa.
        </p>
      </div>
      <div class="flex flex-col sm:flex-row gap-4 justify-center pt-6">
        <Button
          @click="goHome"
          class="px-6 py-3 text-base bg-gradient-to-r from-accent to-accent/90 hover:from-accent/90 hover:to-accent/80 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
        >
          Volver al inicio
        </Button>
        <Button
          @click="goBack"
          variant="outline"
          class="px-6 py-3 text-base border-foreground/20 hover:bg-foreground/5 text-foreground/80 font-medium rounded-lg transition-all duration-200"
        >
          Regresar atrás
        </Button>
      </div>
      <p class="text-sm text-foreground/50 mt-8">
        ¿Sabías que? El error 404 se llama así porque es el número de la habitación donde se alojaban los servidores web originales en el CERN.
      </p>
    </div>
  </div>
</template>
<style scoped>
@keyframes fall {
  0% {
    transform: translateY(-50px) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 0.5;
  }
  90% {
    opacity: 0.5;
  }
  100% {
    transform: translateY(300px) rotate(360deg);
    opacity: 0;
  }
}

.animate-bounce {
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
</style>
