import Quill from 'quill';
// @ts-ignore
import ImageResize from 'quill-image-resize';
import MagicUrl from 'quill-magic-url';

// Register modules
Quill.register('modules/imageResize', ImageResize);
Quill.register('modules/magicUrl', MagicUrl);

// Custom font sizes
const font_sizes = [
  false,
  '8px',
  '9px',
  '10px',
  '11px',
  '12px',
  '13px',
  '14px',
  '15px',
  '16px',
  '18px',
  '20px',
  '22px',
  '24px',
  '32px',
  '36px',
  '40px',
  '48px',
  '54px',
  '64px',
  '96px',
  '128px',
];

// Font Size
const Size = Quill.import('attributors/style/size') as any;
Size.whitelist = font_sizes;
Quill.register(Size, true);

// table
const Table = Quill.import("formats/table-container") as any;
const superCreate = Table.create.bind(Table);
Table.create = (value: any) => {
  const node = superCreate(value);
  node.classList.add('table');
  node.classList.add('table-bordered');
  return node;
};
Quill.register(Table, true);

// Custom link format
const Link = Quill.import('formats/link') as any;

class MyLink extends Link {
  static create(value: any) {
    const node = super.create(value);
    // value = this.sanitize(value);
    node.setAttribute('href', value);
    if (value.startsWith('/') || value.indexOf(window.location.host)) {
      node.removeAttribute('target'); // No target for internal links
    }
    return node;
  }
}
Quill.register(MyLink, true);

// Inline styles
const BackgroundStyle = Quill.import('attributors/style/background') as any;

const ColorStyle = Quill.import('attributors/style/color') as any;

const FontStyle = Quill.import('attributors/style/font') as any;

const AlignStyle = Quill.import('attributors/style/align') as any;

const DirectionStyle = Quill.import('attributors/style/direction') as any;

Quill.register(BackgroundStyle, true);
Quill.register(ColorStyle, true);
Quill.register(FontStyle, true);
Quill.register(AlignStyle, true);
Quill.register(DirectionStyle, true);

// Direction class
const DirectionClass = Quill.import('attributors/class/direction') as any;

Quill.register(DirectionClass, true);

// Replace font tag with span
const Inline = Quill.import('blots/inline') as any;

class CustomColor extends Inline {
  constructor(domNode: any, value: any) {
    super(domNode, value);
    this['domNode'].style.color = this['domNode'].color;
    domNode.outerHTML = this['domNode'].outerHTML
      .replace(/<font/g, '<span')
      .replace(/<\/font>/g, '</span>');
  }
}
CustomColor['blotName'] = 'customColor';
CustomColor['tagName'] = 'font';
Quill.register(CustomColor, true);
