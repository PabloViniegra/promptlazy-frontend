<script setup lang="ts">
import { usePrompts } from '@/composables/usePrompts'
import {
  Plus as PlusIcon,
  MessageSquare as ChatIcon,
  MessageSquare,
  Star as StarIcon,
  ChevronLeft,
  ChevronRight,
  History as HistoryIcon
} from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ref, computed } from 'vue'


const emits = defineEmits<{
  (e: 'select-chat', id: string): void
  (e: 'new-chat'): void
}>()

const collapsed = ref<boolean>(false)
function toggleCollapse() {
  collapsed.value = !collapsed.value
}

const { prompts, isLoading } = usePrompts()
const favourites = computed(() => prompts.value?.filter(p => p.is_favorite) || [])
const isFavoritesLoading = isLoading
</script>
<template>
  <aside
    :class="[
      'flex flex-col transition-all duration-300 ease-in-out',
      'font-sans border-r',
      'bg-background',
      'border-border',
      'text-foreground',
      'shadow-sm',
      'h-full',
      collapsed ? 'w-20' : 'w-80',
    ]"
    style="font-family: var(--font-sans)"
  >
    <div class="flex items-center justify-end p-2">
      <button
        @click="toggleCollapse"
        class="p-1.5 rounded-lg hover:bg-muted/50 transition-colors duration-200 relative group"
        :aria-label="collapsed ? 'Expandir barra lateral' : 'Contraer barra lateral'"
      >
        <div class="relative w-5 h-5 flex items-center justify-center">
          <ChevronLeft
            class="absolute size-5 transition-all duration-300"
            :class="{
              'opacity-100 rotate-0': !collapsed,
              'opacity-0 -rotate-180': collapsed,
              'group-hover:scale-110': true
            }"
          />
          <ChevronRight
            class="absolute size-5 transition-all duration-300"
            :class="{
              'opacity-100 rotate-0': collapsed,
              'opacity-0 rotate-180': !collapsed,
              'group-hover:scale-110': true
            }"
          />
        </div>
      </button>
    </div>
    <ScrollArea class="flex-1 px-4 py-4">
      <div class="mb-6">
        <div :class="['flex items-center mb-3 group', { 'justify-center': collapsed }]">
          <div class="p-2 rounded-lg bg-amber-100/80 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400">
            <StarIcon class="h-4 w-4" />
          </div>
          <h3 v-if="!collapsed" class="ml-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Tus Favoritos</h3>
        </div>

        <div class="space-y-1">
          <template v-if="isFavoritesLoading">
            <div v-for="n in 3" :key="`fav-skeleton-${n}`" class="p-2">
              <Skeleton class="h-4 rounded bg-muted/30" :class="collapsed ? 'w-8 mx-auto' : 'w-full'" />
            </div>
          </template>
          <template v-else-if="favourites.length > 0">
            <Button
              v-for="fav in favourites"
              :key="`fav-${fav.id}`"
              variant="ghost"
              class="flex items-center w-full p-2.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors duration-200 group/item"
              @click="emits('select-chat', fav.id)"
            >
              <div class="p-1.5 rounded-md bg-amber-100/80 dark:bg-amber-900/50 text-amber-700 dark:text-amber-400 group-hover/item:bg-amber-200/80 dark:group-hover/item:bg-amber-800/50 transition-colors">
                <StarIcon class="h-3.5 w-3.5" />
              </div>
              <span v-if="!collapsed" class="ml-3 text-sm font-medium text-slate-700 dark:text-slate-200 truncate text-left flex-1">
                {{ fav.original_prompt || '— sin título —' }}
              </span>
              <span v-if="!collapsed" class="ml-2 text-xs text-muted-foreground">
                {{ new Date(fav.created_at || '').toLocaleDateString('es-ES', { day: 'numeric', month: 'short' }) }}
              </span>
            </Button>
          </template>
          <div v-else :class="['text-center py-4', { 'px-2': !collapsed }]">
            <div class="mx-auto w-8 h-8 flex items-center justify-center rounded-full bg-muted/50 mb-2">
              <StarIcon class="h-4 w-4 text-muted-foreground" />
            </div>
            <p v-if="!collapsed" class="text-xs text-muted-foreground">Añade chats a favoritos</p>
          </div>
        </div>
      </div>
      <div class="relative my-4">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-border/50"></div>
        </div>
        <div v-if="!collapsed" class="relative flex justify-center">
          <span class="px-2 text-xs bg-background text-muted-foreground">Historial de chats</span>
        </div>
      </div>
      <div class="mb-4">
        <div :class="['flex items-center mb-2', { 'justify-center': collapsed }]">
          <div class="p-2 rounded-lg bg-blue-100/80 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">
            <HistoryIcon class="h-4 w-4" />
          </div>
          <h3 v-if="!collapsed" class="ml-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Historial Reciente</h3>
        </div>

        <div class="space-y-1">
          <template v-if="isLoading">
            <div v-for="n in 3" :key="`hist-skeleton-${n}`" class="p-2">
              <Skeleton class="h-4 rounded bg-muted/30" :class="collapsed ? 'w-8 mx-auto' : 'w-full'" />
            </div>
          </template>
          <template v-else-if="prompts.length > 0">
            <Button
              v-for="chat in prompts"
              :key="`chat-${chat.id}`"
              variant="ghost"
              class="flex items-center w-full p-2.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors duration-200 group/item"
              @click="emits('select-chat', chat.id)"
            >
              <div class="p-1.5 rounded-md bg-blue-100/80 dark:bg-blue-900/50 text-blue-700 dark:text-blue-400 group-hover/item:bg-blue-200/80 dark:group-hover/item:bg-blue-800/50 transition-colors">
                <ChatIcon class="h-3.5 w-3.5" />
              </div>
              <span v-if="!collapsed" class="ml-3 text-sm font-medium text-slate-700 dark:text-slate-200 truncate text-left flex-1">
                {{ chat.original_prompt || '— sin título —' }}
              </span>
              <span v-if="!collapsed" class="ml-2 text-xs text-muted-foreground">
                {{ new Date(chat.created_at || '').toLocaleDateString('es-ES', { day: 'numeric', month: 'short' }) }}
              </span>
            </Button>
          </template>
          <div v-else :class="['text-center py-4', { 'px-2': !collapsed }]">
            <div class="mx-auto w-8 h-8 flex items-center justify-center rounded-full bg-muted/50 mb-2">
              <MessageSquare class="h-4 w-4 text-muted-foreground" />
            </div>
            <p v-if="!collapsed" class="text-xs text-muted-foreground">No hay chats recientes</p>
          </div>
        </div>
      </div>
    </ScrollArea>
    <div class="p-4 pt-0">
      <Button
        variant="default"
        class="w-full flex items-center justify-center gap-3 group relative overflow-hidden transition-all duration-300 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white shadow-lg hover:shadow-blue-500/30"
        :class="[
          collapsed ? 'h-12 w-12 rounded-full p-0' : 'h-12 rounded-lg px-6',
          'transform hover:scale-[1.02] active:scale-95 transition-transform duration-200 font-medium'
        ]"
        style="font-family: var(--font-sans)"
        @click="emits('new-chat')"
      >
        <span class="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -translate-x-full group-hover:translate-x-full"></span>

        <PlusIcon
          class="h-5 w-5 transition-all duration-300 group-hover:scale-110"
          :class="{'group-hover:rotate-90': !collapsed}"
        />
        <span
          v-if="!collapsed"
          class="font-medium text-sm tracking-wide transition-all duration-300"
        >
          Nuevo chat
        </span>
        <span class="absolute inset-0 overflow-hidden">
          <span class="absolute inset-0 bg-white/20 opacity-0 group-active:opacity-100 group-active:animate-ping rounded-full"></span>
        </span>
      </Button>
    </div>
  </aside>
</template>
<style scoped>
.transition-width {
  transition-property: width;
}
</style>
