<script setup lang="ts">
import { ref } from 'vue'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const open = ref<boolean>(false)
</script>
<template>
  <div>
    <Button
      variant="link"
      @click="open = true"
      class="font-sans text-sm font-medium text-primary hover:text-primary/80 transition-colors duration-200 p-0 h-auto"
    >
      Términos y Privacidad
    </Button>
    <Dialog v-model:open="open">
      <DialogContent class="max-w-4xl w-full h-[90vh] p-0 overflow-hidden font-sans">
        <div class="relative">
          <div
            class="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/20 opacity-20 dark:from-primary/10 dark:to-primary/5"
          ></div>
          <div class="relative">
            <DialogHeader class="px-8 pt-8 pb-6 border-b bg-card/80 backdrop-blur-sm dark:bg-card/90">
              <div class="flex items-start space-x-4">
                <div class="p-2.5 rounded-xl bg-primary/10 text-primary flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="h-6 w-6"
                  >
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                    <polyline points="14 2 14 8 20 8" />
                    <path d="M10 15h.01" />
                    <path d="M14 15h2" />
                    <path d="M10 11h.01" />
                    <path d="M14 11h2" />
                    <path d="M10 7h.01" />
                    <path d="M14 7h2" />
                  </svg>
                </div>
                <div class="space-y-1.5">
                  <DialogTitle class="text-2xl font-bold tracking-tight text-foreground font-sans">
                    Términos del Servicio y Política de Privacidad
                  </DialogTitle>
                  <DialogDescription class="text-sm text-muted-foreground font-sans">
                    Última actualización: 10 de julio de 2025
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>
          </div>
        </div>
        <ScrollArea class="h-[calc(90vh-180px)] px-8 py-6">
          <Card class="border-0 shadow-none bg-transparent">
            <CardContent class="p-0 space-y-8">
              <section class="space-y-6 text-base leading-relaxed text-foreground font-sans">
                <div class="space-y-2">
                  <h3 class="text-base font-semibold text-primary flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="mr-2"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                    1. Aceptación de los Términos
                  </h3>
                  <p>
                    Al utilizar PromptLazy, aceptas cumplir con estos Términos y todas las leyes
                    correspondientes. Si no estás de acuerdo con alguno de estos términos, te
                    rogamos que no uses la plataforma.
                  </p>

                  <h3 class="text-base font-semibold text-primary flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="mr-2"
                    >
                      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                      <line x1="8" y1="21" x2="16" y2="21"></line>
                      <line x1="12" y1="17" x2="12" y2="21"></line>
                    </svg>
                    2. Uso de la Plataforma
                  </h3>
                  <p>
                    PromptLazy ofrece un servicio de optimización de prompts mediante Inteligencia
                    Artificial. Te comprometes a utilizar el servicio de manera ética y responsable,
                    sin intentar manipular, abusar del sistema o violar derechos de terceros.
                  </p>

                  <h3 class="text-base font-semibold text-primary flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="mr-2"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                      <circle cx="12" cy="9" r="1"></circle>
                      <line x1="12" y1="12" x2="12" y2="16"></line>
                    </svg>
                    3. Responsabilidades del Usuario
                  </h3>
                  <p>
                    Eres el único responsable del contenido que generas y envías a través de la
                    plataforma. No publicaremos contenido ilegal, difamatorio, obsceno o que viole
                    derechos de autor.
                  </p>

                  <h3 class="text-base font-semibold text-primary flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="mr-2"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                      <line x1="12" y1="17" x2="12.01" y2="17"></line>
                    </svg>
                    4. Propiedad Intelectual
                  </h3>
                  <p>
                    Todo el contenido, marcas y tecnologías de PromptLazy son propiedad de sus
                    respectivos titulares. No se concede licencia alguna sobre ninguna de las marcas
                    o contenidos sin nuestro permiso expreso.
                  </p>

                  <h3 class="text-base font-semibold text-primary flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="mr-2"
                    >
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                    5. Política de Privacidad
                  </h3>
                  <p>
                    Recopilamos únicamente los datos necesarios para proporcionar el servicio: tus
                    correos electrónicos, historial de prompts y tokens de autenticación. Nunca
                    compartiremos tus datos con terceros sin tu consentimiento, salvo obligaciones
                    legales.
                  </p>

                  <h3 class="text-base font-semibold text-primary flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="mr-2"
                    >
                      <path
                        d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2z"
                      ></path>
                      <path d="M12 8v8"></path>
                      <path d="M8 12h8"></path>
                    </svg>
                    6. Seguridad de los Datos
                  </h3>
                  <p>
                    Implementamos medidas razonables de seguridad técnica y organizativa para
                    proteger tu información. Sin embargo, ningún método de transmisión o
                    almacenamiento es 100% seguro.
                  </p>

                  <h3 class="text-base font-semibold text-primary flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="mr-2"
                    >
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                    </svg>
                    7. Modificaciones a los Términos
                  </h3>
                  <p>
                    Nos reservamos el derecho a actualizar estos términos y la política de
                    privacidad en cualquier momento. Te notificaremos a través del correo registrado
                    o mediante un aviso en la plataforma.
                  </p>

                  <h3 class="text-base font-semibold text-primary flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="mr-2"
                    >
                      <path
                        d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                      ></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                    8. Contacto
                  </h3>
                  <p>
                    Si tienes dudas o reclamos, contáctanos en
                    <a href="mailto:soporte@promptlazy.com" class="text-primary underline"
                      >soporte@promptlazy.com</a
                    >.
                  </p>
                </div>
              </section>
            </CardContent>
          </Card>
        </ScrollArea>

        <div class="border-t bg-muted/20 p-4 flex justify-end space-x-3">
          <Button
            variant="outline"
            @click="open = false"
            class="px-6 font-sans font-medium"
          >
            Cerrar
          </Button>
          <Button
            @click="open = false"
            class="px-6 bg-primary hover:bg-primary/90 font-sans font-medium"
          >
            Aceptar y continuar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  </div>
</template>
<style scoped>
:deep(.ScrollAreaViewport) {
  scrollbar-width: thin;
  scrollbar-color: hsl(var(--muted-foreground) / 0.3) transparent;
  padding-right: 0.5rem;
  margin-right: -0.5rem;
  scrollbar-gutter: stable;
}

:deep(.ScrollAreaViewport::-webkit-scrollbar) {
  width: 8px;
  height: 8px;
}

:deep(.ScrollAreaViewport::-webkit-scrollbar-track) {
  background: transparent;
  border-radius: 4px;
}

:deep(.ScrollAreaViewport::-webkit-scrollbar-thumb) {
  background-color: hsl(var(--muted-foreground) / 0.3);
  border-radius: 4px;
  border: 2px solid transparent;
  background-clip: padding-box;
  transition: background-color 0.2s ease-in-out;
}

:deep(.ScrollAreaViewport::-webkit-scrollbar-thumb:hover) {
  background-color: hsl(var(--muted-foreground) / 0.5);
}

h3 {
  scroll-margin-top: 1rem;
  font-family: var(--font-sans);
}


</style>
