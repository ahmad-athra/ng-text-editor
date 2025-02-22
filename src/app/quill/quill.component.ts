import { JsonPipe } from '@angular/common';
import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomModule, QuillModule, QuillModules } from 'ngx-quill'
import Quill from 'quill';
import { defer } from 'rxjs';



// // Register modules
// Quill.register('modules/imageResize', ImageResize);
// Quill.register('modules/magicUrl', MagicUrl);

@Component({
  selector: 'app-quill',
  encapsulation: ViewEncapsulation.None,
  imports: [QuillModule, ReactiveFormsModule, JsonPipe, FormsModule],
  templateUrl: './quill.component.html',
  styleUrl: './quill.component.scss'
})
export class QuillComponent implements OnInit {
  private readonly fb = inject(FormBuilder)
  someForm = this.fb.group({
    default: this.fb.control(''),
    textEditor: this.fb.control('')
  })

  // example default values
   modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],

      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction

      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],

      ['clean'],                                         // remove formatting button

      ['link', 'image', 'video']                         // link and image, video
    ]
  };
  // font size
private font_sizes = [
	false,
	"8px",
	"9px",
	"10px",
	"11px",
	"12px",
	"13px",
	"14px",
	"15px",
	"16px",
	"18px",
	"20px",
	"22px",
	"24px",
	"32px",
	"36px",
	"40px",
	"48px",
	"54px",
	"64px",
	"96px",
	"128px",
];

  quillConfig:QuillModules = {
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, false] }],
        [{'size': this.font_sizes}],
        ['bold', 'italic', 'underline', 'strike', 'clean'],        // toggled buttons
        [{ 'color': [] }, { 'background': [] }],
        ['blockquote', 'code-block'],
        [{ 'direction': 'rtl' }],
        ['link', 'image'],
        [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
        [{ align: [] }],
        [{ indent: "-1" }, { indent: "+1" }],
        			[
				{
					table: [
						"insert-table",
						"insert-row-above",
						"insert-row-below",
						"insert-column-right",
						"insert-column-left",
						"delete-row",
						"delete-column",
						"delete-table",
					],
				},
			],
      ]
    }
  }






  // ----------------------
  ngOnInit(): void {
    const Size = Quill.import("attributors/style/size") as any;
    Size.whitelist = this.font_sizes;
    Quill.register(Size, true);
  }
}
