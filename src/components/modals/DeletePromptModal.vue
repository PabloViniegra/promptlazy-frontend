<script setup lang="ts">
import { Loader2, Trash2 } from 'lucide-vue-next'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

const props = defineProps<{
  isOpen: boolean
  isDeleting?: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'confirm'): void
  (e: 'update:isOpen', value: boolean): void
}>()

const handleClose = () => {
  if (!props.isDeleting) {
    emit('close')
    emit('update:isOpen', false)
  }
}

const handleConfirm = () => {
  if (!props.isDeleting) {
    emit('confirm')
  }
}

const onOpenChange = (open: boolean) => {
  if (!open) {
    handleClose()
  } else {
    emit('update:isOpen', open)
  }
}
</script>
<template>
  <Dialog :open="isOpen" @update:open="onOpenChange">
    <DialogContent 
      class="font-sans max-w-[95%] sm:max-w-md rounded-xl border-0 p-0 overflow-hidden"
      :class="{ 'pointer-events-none': isDeleting }"
    >
      <DialogHeader class="px-6 pt-6 pb-4">
        <div class="flex items-start gap-4">
          <div class="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-destructive/10">
            <Trash2 class="h-5 w-5 text-destructive" />
          </div>
          <div class="space-y-1">
            <DialogTitle class="text-xl font-semibold leading-7 text-foreground">
              Eliminar prompt
            </DialogTitle>
            <DialogDescription class="text-base leading-6 text-muted-foreground">
              ¿Estás seguro de que quieres eliminar este prompt? Esta acción no se puede deshacer y el contenido se perderá permanentemente.
            </DialogDescription>
          </div>
        </div>
      </DialogHeader>
      
      <DialogFooter class="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end px-6 pb-6 pt-2 bg-muted/30">
        <Button
          type="button"
          variant="outline"
          size="lg"
          @click="handleClose"
          :disabled="isDeleting"
          class="w-full sm:w-auto px-6 h-10 text-sm font-medium transition-colors"
        >
          Cancelar
        </Button>
        <Button
          type="button"
          variant="destructive"
          size="lg"
          @click="handleConfirm"
          :disabled="isDeleting"
          class="w-full sm:w-auto px-6 h-10 text-sm font-medium transition-colors"
        >
          <Loader2 v-if="isDeleting" class="mr-2 h-4 w-4 animate-spin" />
          {{ isDeleting ? 'Eliminando...' : 'Eliminar' }}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
<style scoped>
:deep([data-radix-dialog-content]) {
  animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 10px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  background-color: hsl(var(--background));
  border: 1px solid hsl(var(--border));
}

:deep([data-radix-dialog-overlay]) {
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes overlayShow {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes contentShow {
  from { 
    opacity: 0;
    transform: translate(-50%, -48%) scale(0.96);
  }
  to { 
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}

:deep([data-radix-dialog-content]) {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 28rem;
  max-height: 85vh;
  overflow-y: auto;
}

:deep([data-radix-dialog-title]) {
  margin: 0;
  font-weight: 600;
  color: hsl(var(--foreground));
  font-size: 1.125rem;
  line-height: 1.75rem;
}

:deep([data-radix-dialog-description]) {
  margin: 0.5rem 0 0;
  color: hsl(var(--muted-foreground));
  font-size: 0.9375rem;
  line-height: 1.5rem;
}
</style>
