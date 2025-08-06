"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import { toast } from 'react-toastify';
import { 
  Bold, 
  Italic, 
  Underline as UnderlineIcon, 
  Strikethrough, 
  List, 
  ListOrdered, 
  Quote, 
  Code, 
  Link as LinkIcon,
  Image as ImageIcon,
  Heading1,
  Heading2,
  Heading3,
  X
} from 'lucide-react';
import { Button } from './button';
import { Input } from './input';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (value: string) => void;
  title: string;
  placeholder: string;
  buttonText: string;
}

const Dialog = ({ isOpen, onClose, onSubmit, title, placeholder, buttonText }: DialogProps) => {
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onSubmit(value.trim());
      setValue('');
      onClose();
    } else {
      toast.error('Please enter a valid URL');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <form onSubmit={handleSubmit}>
          <Input
            type="url"
            placeholder={placeholder}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="mb-4"
            autoFocus
          />
          <div className="flex gap-2 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button type="submit">
              {buttonText}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

const MenuBar = ({ editor }: { editor: any }) => {
  const [linkDialog, setLinkDialog] = useState(false);
  const [imageDialog, setImageDialog] = useState(false);

  if (!editor) {
    return null;
  }

  const addLink = (url: string) => {
    if (url) {
      // Basic URL validation
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
      }
      
      try {
        new URL(url); // Validate URL
        editor.chain().focus().setLink({ href: url }).run();
        toast.success('Link added successfully!');
      } catch {
        toast.error('Please enter a valid URL');
      }
    }
  };

  const addImage = (url: string) => {
    if (url) {
      // Basic URL validation
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
      }
      
      try {
        new URL(url); // Validate URL
        editor.chain().focus().setImage({ src: url }).run();
        toast.success('Image added successfully!');
      } catch {
        toast.error('Please enter a valid image URL');
      }
    }
  };

  return (
    <>
      <div className="border-b border-gray-200 p-2 flex flex-wrap gap-1 bg-gray-50">
        {/* Text Formatting */}
        <div className="flex items-center gap-1 border-r border-gray-300 pr-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={cn(
              "h-10 w-10 p-0 hover:scale-110 transition-colors",
              editor.isActive('bold') && "bg-blue-100 text-blue-700"
            )}
            title="Bold (Ctrl+B)"
          >
            <Bold className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={cn(
              "h-10 w-10 p-0 hover:scale-110 transition-colors",
              editor.isActive('italic') && "bg-blue-100 text-blue-700"
            )}
            title="Italic (Ctrl+I)"
          >
            <Italic className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={cn(
              "h-10 w-10 p-0 hover:scale-110 transition-colors",
              editor.isActive('underline') && "bg-blue-100 text-blue-700"
            )}
            title="Underline (Ctrl+U)"
          >
            <UnderlineIcon className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={cn(
              "h-10 w-10 p-0 hover:scale-110 transition-colors",
              editor.isActive('strike') && "bg-blue-100 text-blue-700"
            )}
            title="Strikethrough"
          >
            <Strikethrough className="h-5 w-5" />
          </Button>
        </div>

        {/* Headings */}
        <div className="flex items-center gap-1 border-r border-gray-300 pr-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              const { from, to } = editor.state.selection;
              if (from === to) {
                // No selection, apply to current line
                if (editor.isActive('heading', { level: 1 })) {
                  editor.chain().focus().setParagraph().run();
                } else {
                  editor.chain().focus().setHeading({ level: 1 }).run();
                }
              } else {
                // Has selection, wrap selected text in heading
                const selectedText = editor.state.doc.textBetween(from, to);
                editor.chain().focus().deleteRange({ from, to }).run();
                editor.chain().focus().insertContent(`<h1>${selectedText}</h1>`).run();
              }
            }}
            className={cn(
              "h-10 w-10 p-0 hover:scale-110 transition-colors",
              editor.isActive('heading', { level: 1 }) && "bg-blue-100 text-blue-700"
            )}
            title="Heading 1"
          >
            <Heading1 className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              const { from, to } = editor.state.selection;
              if (from === to) {
                // No selection, apply to current line
                if (editor.isActive('heading', { level: 2 })) {
                  editor.chain().focus().setParagraph().run();
                } else {
                  editor.chain().focus().setHeading({ level: 2 }).run();
                }
              } else {
                // Has selection, wrap selected text in heading
                const selectedText = editor.state.doc.textBetween(from, to);
                editor.chain().focus().deleteRange({ from, to }).run();
                editor.chain().focus().insertContent(`<h2>${selectedText}</h2>`).run();
              }
            }}
            className={cn(
              "h-10 w-10 p-0 hover:scale-110 transition-colors",
              editor.isActive('heading', { level: 2 }) && "bg-blue-100 text-blue-700"
            )}
            title="Heading 2"
          >
            <Heading2 className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              const { from, to } = editor.state.selection;
              if (from === to) {
                // No selection, apply to current line
                if (editor.isActive('heading', { level: 3 })) {
                  editor.chain().focus().setParagraph().run();
                } else {
                  editor.chain().focus().setHeading({ level: 3 }).run();
                }
              } else {
                // Has selection, wrap selected text in heading
                const selectedText = editor.state.doc.textBetween(from, to);
                editor.chain().focus().deleteRange({ from, to }).run();
                editor.chain().focus().insertContent(`<h3>${selectedText}</h3>`).run();
              }
            }}
            className={cn(
              "h-10 w-10 p-0 hover:scale-110 transition-colors",
              editor.isActive('heading', { level: 3 }) && "bg-blue-100 text-blue-700"
            )}
            title="Heading 3"
          >
            <Heading3 className="h-5 w-5" />
          </Button>
        </div>

        {/* Lists */}
        <div className="flex items-center gap-1 border-r border-gray-300 pr-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={cn(
              "h-10 w-10 p-0 hover:scale-110 transition-colors",
              editor.isActive('bulletList') && "bg-blue-100 text-blue-700"
            )}
            title="Bullet List"
          >
            <List className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={cn(
              "h-10 w-10 p-0 hover:scale-110 transition-colors",
              editor.isActive('orderedList') && "bg-blue-100 text-blue-700"
            )}
            title="Numbered List"
          >
            <ListOrdered className="h-5 w-5" />
          </Button>
        </div>

        {/* Block Elements */}
        <div className="flex items-center gap-1 border-r border-gray-300 pr-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={cn(
              "h-10 w-10 p-0 hover:scale-110 transition-colors",
              editor.isActive('blockquote') && "bg-blue-100 text-blue-700"
            )}
            title="Blockquote"
          >
            <Quote className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={cn(
              "h-10 w-10 p-0 hover:scale-110 transition-colors",
              editor.isActive('codeBlock') && "bg-blue-100 text-blue-700"
            )}
            title="Code Block"
          >
            <Code className="h-5 w-5" />
          </Button>
        </div>

        {/* Links and Images */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLinkDialog(true)}
            className={cn(
              "h-10 w-10 p-0 hover:scale-110 transition-colors",
              editor.isActive('link') && "bg-blue-100 text-blue-700"
            )}
            title="Insert Link"
          >
            <LinkIcon className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setImageDialog(true)}
            className="h-10 w-10 p-0 hover:scale-110 transition-colors"
            title="Insert Image"
          >
            <ImageIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Dialogs */}
      <Dialog
        isOpen={linkDialog}
        onClose={() => setLinkDialog(false)}
        onSubmit={addLink}
        title="Insert Link"
        placeholder="Enter URL (e.g., https://example.com)"
        buttonText="Insert Link"
      />
      
      <Dialog
        isOpen={imageDialog}
        onClose={() => setImageDialog(false)}
        onSubmit={addImage}
        title="Insert Image"
        placeholder="Enter image URL (e.g., https://example.com/image.jpg)"
        buttonText="Insert Image"
      />
    </>
  );
};

export const RichTextEditor = ({ 
  value, 
  onChange, 
  placeholder = "Start writing...",
  className 
}: RichTextEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 underline cursor-pointer',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg',
        },
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none focus:outline-none min-h-[200px] p-4',
      },
    },
    immediatelyRender: false,
  });

  return (
    <div className={cn("border border-gray-300 rounded-md bg-white", className)}>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
      {!editor?.getText() && (
        <div className="absolute top-[60px] left-4 text-gray-400 pointer-events-none">
          {placeholder}
        </div>
      )}
    </div>
  );
}; 