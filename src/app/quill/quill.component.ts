import { JsonPipe } from '@angular/common';
import { Component, inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuillModule, QuillModules } from 'ngx-quill';
import Quill from 'quill';

import './quill.config'; // Import the Quill configuration

@Component({
  selector: 'app-quill',
  encapsulation: ViewEncapsulation.None,
  imports: [QuillModule, ReactiveFormsModule, JsonPipe, FormsModule],
  templateUrl: './quill.component.html',
  styleUrl: './quill.component.scss'
})
export class QuillComponent  {
  private readonly fb = inject(FormBuilder)
  someForm = this.fb.group({
    default: this.fb.control(''),
    textEditor: this.fb.control('')
  })

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
    imageResize: {},
    magicUrl: true,
    table: true,
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
      ],
    }
  }

  quill!: Quill; // Quill instance
    // Get the Quill instance
    onEditorCreated(quill: Quill) {

      this.quill = quill;
      this.setupTableCommands();
    }
    setupTableCommands() {
      const toolbar = this.quill.getModule('toolbar') as any;

      const tableModule = this.quill.getModule('table') as any;

      // Find the table picker in the toolbar
      const tablePicker = toolbar.container.querySelector('.ql-table');

      if (tablePicker) {
        // Add click event listener to the table picker items
        tablePicker.addEventListener('click', (e: Event) => {

          const target = e.target as HTMLElement;
          if (target.classList.contains('ql-picker-item')) {
            const action = target.getAttribute('data-value');

            e.preventDefault();

            switch (action) {
              case 'insert-table':
                tableModule.insertTable(2, 2);
                break;
              case 'insert-row-above':
                tableModule.insertRowAbove();
                break;
              case 'insert-row-below':
                tableModule.insertRowBelow();
                break;
              case 'insert-column-left':
                tableModule.insertColumnLeft();
                break;
              case 'insert-column-right':
                tableModule.insertColumnRight();
                break;
              case 'delete-row':
                tableModule.deleteRow();
                break;
              case 'delete-column':
                tableModule.deleteColumn();
                break;
              case 'delete-table':
                tableModule.deleteTable();
                break;
            }

            if (action !== 'delete-row') {
              tableModule.balanceTables();
            }
          }
        });
      }
    }
}
