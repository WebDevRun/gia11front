<template>
  <div class="editor" v-if="editor">
    <div class="editor__header header">
      <div v-for='(item, index) in editorMenuItems' :key='index'>
        <div class="header__divider" v-if="item.type === 'divider'" />
        <button class="header__item" :class="{ 'is-active': item.isActive ? item.isActive(): null }" v-else @click="item.action" :title="item.title">
          <img :src="require(`../assets/textEditorSvg/${item.icon}.svg`)" :alt="`${item.title}`">
        </button>
      </div>
    </div>
    <EditorContent :editor='editor' class="editor__content content" />
  </div>
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-3'
import { defaultExtensions } from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'

export default {
  name: 'TextEditor',
  components: {
    EditorContent
  },
  data () {
    return {
      editor: null,
      editorMenuItems: [
        {
          icon: 'arrow-go-back-line',
          title: 'Undo',
          action: () => this.editor.chain().focus().undo().run()
        },
        {
          icon: 'arrow-go-forward-line',
          title: 'Redo',
          action: () => this.editor.chain().focus().redo().run()
        },
        {
          icon: 'link',
          title: 'Link',
          action: () => {
            const url = window.prompt('URL')
            this.editor.chain().focus().setLink({ href: url }).run()
          },
          isActive: () => this.editor.isActive('link')
        },
        {
          icon: 'format-clear',
          title: 'Clear Format',
          action: () => this.editor.chain().focus().clearNodes().unsetAllMarks().run()
        },
        {
          type: 'divider'
        },
        {
          icon: 'bold',
          title: 'Bold',
          action: () => this.editor.chain().focus().toggleBold().run(),
          isActive: () => this.editor.isActive('bold')
        },
        {
          icon: 'italic',
          title: 'Italic',
          action: () => this.editor.chain().focus().toggleItalic().run(),
          isActive: () => this.editor.isActive('italic')
        },
        {
          icon: 'underline',
          title: 'Underline',
          action: () => this.editor.chain().focus().toggleUnderline().run(),
          isActive: () => this.editor.isActive('underline')
        },
        {
          icon: 'strikethrough',
          title: 'Strike',
          action: () => this.editor.chain().focus().toggleStrike().run(),
          isActive: () => this.editor.isActive('strike')
        },
        {
          type: 'divider'
        },
        {
          icon: 'align-left',
          title: 'Align Left',
          action: () => this.editor.chain().focus().setTextAlign('left').run(),
          isActive: () => this.editor.isActive({ textAlign: 'left' })
        },
        {
          icon: 'align-center',
          title: 'Align Center',
          action: () => this.editor.chain().focus().setTextAlign('center').run(),
          isActive: () => this.editor.isActive({ textAlign: 'center' })
        },
        {
          icon: 'align-right',
          title: 'Align Right',
          action: () => this.editor.chain().focus().setTextAlign('right').run(),
          isActive: () => this.editor.isActive({ textAlign: 'right' })
        },
        {
          icon: 'align-justify',
          title: 'Align Justify',
          action: () => this.editor.chain().focus().setTextAlign('justify').run(),
          isActive: () => this.editor.isActive({ textAlign: 'justify' })
        },
        {
          type: 'divider'
        },
        {
          icon: 'h-1',
          title: 'Heading 1',
          action: () => this.editor.chain().focus().toggleHeading({ level: 1 }).run(),
          isActive: () => this.editor.isActive('heading', { level: 1 })
        },
        {
          icon: 'h-2',
          title: 'Heading 2',
          action: () => this.editor.chain().focus().toggleHeading({ level: 2 }).run(),
          isActive: () => this.editor.isActive('heading', { level: 2 })
        },
        {
          icon: 'h-3',
          title: 'Heading 3',
          action: () => this.editor.chain().focus().toggleHeading({ level: 3 }).run(),
          isActive: () => this.editor.isActive('heading', { level: 3 })
        },
        {
          icon: 'list-ordered',
          title: 'Ordered List',
          action: () => this.editor.chain().focus().toggleOrderedList().run(),
          isActive: () => this.editor.isActive('orderedList')
        },
        {
          icon: 'list-unordered',
          title: 'Bullet List',
          action: () => this.editor.chain().focus().toggleBulletList().run(),
          isActive: () => this.editor.isActive('bulletList')
        }
      ]
    }
  },
  mounted () {
    this.editor = new Editor({
      type: 'doc',
      extensions: [
        ...defaultExtensions(),
        TextAlign,
        Underline,
        Link
      ]
    })
  },
  beforeUnmount () {
    this.editor.destroy()
  }
}
</script>

<style lang="scss">
.editor {
  display: flex;
  flex-direction: column;
  padding: 5px;
  &__header {
    flex-wrap: wrap;
    padding: 0.25rem;
  }
  &__content {
    padding: 0 1rem;
    overflow-x: hidden;
    overflow-y: auto;
  }
}

.header {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  box-shadow: 0 .125rem .25rem rgba(0, 0, 0, .075);
  border-radius: .25rem;
  font-size: 1.2em;
  margin-bottom: 5px;
  & div {
    margin: 0 5px;
    padding: 2px 0;
  }
  &__divider {
    width: 1px;
    height: 1.25rem;
    background-color: #000000;
  }
  &__item {
    width: 1.75rem;
    height: 1.75rem;
    border: none;
    border-radius: 0.4rem;
    padding: 0.25rem;
    background-color: #fff;
    &.is-active,
    &:hover {
      background-color: #eee;
    }
    & img {
      width: 100%;
      height: 100%;
    }
  }
}

.content {
  background-color: #fff;
  box-shadow: 0 .125rem .25rem rgba(0, 0, 0, .075);
  border-radius: .25rem;
  font-size: 1.2em;
}

.ProseMirror {
  > * + * {
    margin-top: 0.75em;
  }

  ul,
  ol {
    padding: 0 1rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
  }

  hr {
    margin: 1rem 0;
  }

  blockquote {
    padding-left: 1rem;
    border-left: 2px solid rgba(#0D0D0D, 0.1);
  }

  hr {
    border: none;
    border-top: 2px solid rgba(#0D0D0D, 0.1);
    margin: 2rem 0;
  }

  ul[data-type="taskList"] {
    list-style: none;
    padding: 0;

    li {
      display: flex;
      align-items: center;

      > label {
        flex: 0 0 auto;
        margin-right: 0.5rem;
      }
    }
  }
}
</style>
