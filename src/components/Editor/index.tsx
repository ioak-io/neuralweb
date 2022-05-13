/* eslint-disable no-bitwise */
/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { marked } from 'marked';
import { format } from 'date-fns';
import CodeMirror from 'codemirror';
import { isEqual } from 'lodash';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCompressAlt,
  faExpandAlt,
  faFileExport,
  faPlus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';

import './style.scss';
import NoteModel from '../../model/NoteModel';

require('codemirror/mode/gfm/gfm');

interface Props {
  space: string;
  note: NoteModel;
  handleChange: any;
  handleSave: any;
}

const FILE_LIST = [
  {
    name: 'Itaque mollitia ducimus quas reiciendis sequi sunt eius rem enim a',
    id: '1',
  },
  {
    name: 'Iure consequatur enim possimus ipsum facilis asperiores dolorem',
    id: '2',
  },
  {
    name: 'nulla amet suscipit ipsum',
    id: '3',
  },
];

const TAG_LIST = ['nulla', 'simba', 'elsa', 'anna', 'nala'];

const Editor = (props: Props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const authorization = useSelector((state: any) => state.authorization);
  const noteList = useSelector((state: any) => state.note.items);
  const company = useSelector((state: any) =>
    state.company.items.find(
      (item: any) => item.reference === parseInt(props.space, 10)
    )
  );

  const [noteMap, setNoteMap] = useState<any>({});

  useEffect(() => {
    const _noteMap: any = {};
    noteList.forEach((item: NoteModel) => {
      _noteMap[item.name] = item;
    });
    setNoteMap(_noteMap);
  }, [noteList]);

  useEffect(() => {
    function onDestroyHandler(e: any) {
      e.preventDefault();
      if (!isEqual(props.note, stateRef.current)) {
        e.returnValue = false;
      }
    }
    window.addEventListener('beforeunload', onDestroyHandler);
    return () => {
      props.handleSave(stateRef.current);
      window.removeEventListener('beforeunload', onDestroyHandler);
    };
  }, []);

  const cmRef = useRef<any>(null);

  const stateRef = useRef<NoteModel>();

  useEffect(() => {
    stateRef.current = { ...props.note };
    if (cmRef.current) {
      // cmRef.current.setValue(props.note.content);
    }
  }, [props.note]);

  const [codemirrorInstance, setCodemirrorInstance] = useState<any>(null);

  useEffect(() => {
    const el: any = document.getElementById('my123');
    let cm: any = null;
    if (el) {
      cm = CodeMirror.fromTextArea(el, {
        mode: {
          name: 'markdown',
          highlightFormatting: true,
        },
        extraKeys: {
          'Ctrl-Space': (cm: any) => {
            cm.showHint({ hint: hintingFunction });
          },
        },
        autofocus: true,
        // extensions: [
        //   markdown({
        //     base: markdownLanguage,
        //     codeLanguages: languages,
        //   }),
        // ],
        // mode: 'gfm',
        lineWrapping: true,
        tabSize: 2,
        theme: 'markdown',
      });
      cm.on('change', (cm: any) => {
        const content = cm.doc.getValue();
        props.handleChange({ ...stateRef.current, content });
      });
      cm.on('inputRead', function (cm: any, event: any) {
        if (
          // !cm.state.completionActive &&
          ![
            'ArrowDown',
            'ArrowUp',
            'ArrowLeft',
            'ArrowRight',
            'Escape',
            'Enter',
            '',
          ].includes(event.code)
        ) {
          // CodeMirror.commands.autocomplete(cm, null, { completeSingle: false });const cursor = editor.getCursor();
          const cursor = cm.getCursor();
          const currentLine = cm.getLine(cursor.line);
          const token = cm.getTokenAt(cursor);
          const word = getWordAt(currentLine, cursor.ch - 1);
          suggestTag(word, token);
          suggestFile(word, cursor, token);
        }
      });
      setCodemirrorInstance(cm);
      cm.setValue(props.note.content);
      // cm.setSize(null, '100%');
      cm.setSize('100%', '100%');
      cmRef.current = cm;
    }

    function suggestTag(word: string, token: any) {
      if (!word.startsWith('#') && word.length <= 1) {
        return;
      }
      const list = TAG_LIST.filter((item: string) =>
        item.toLowerCase().includes(word.substring(1).toLowerCase())
      );
      const options = {
        hint: () => {
          return {
            // from: cm.getDoc().getCursor(),
            // to: cm.getDoc().getCursor(),
            from: CodeMirror.Pos(cm.getCursor().line, token.start),
            to: CodeMirror.Pos(cm.getCursor().line, token.end),
            list,
          };
        },
        completeSingle: false,
      };
      // setTimeout(() => {
      cm.showHint(options);
      // }, 0);
    }

    function suggestFile(word: string, cursor: any, token: any) {
      if (!word.startsWith('[[')) {
        return;
      }
      if (!word.endsWith(']]')) {
        cm.getDoc().replaceRange(word.endsWith('[[') ? ']]' : ']] ', cursor);
        cm.setCursor({
          line: cursor.line,
          ch: cursor.ch,
        });
        return;
      }

      const searchWord = word.replace(/[\[\]']+/g, '');
      if (searchWord.length > 0) {
        const list = noteList
          .filter((item: any) =>
            item.name.toLowerCase().includes(searchWord.toLowerCase())
          )
          .map((item: any) => {
            return {
              text: item.reference,
              displayText: item.name,
              render(el: any, cm: any, data: any) {
                const text = document.createElement('div');
                text.innerText = data.displayText;
                el.appendChild(text);
                const subtext = document.createElement('div');
                subtext.innerText = data.text;
                el.appendChild(subtext);
                // const icon = document.createElement('span');
                // icon.className = 'myicon';
              },
            };
          });

        console.log(list);
        // const list = TAG_LIST.filter((item: string) =>
        //   item.toLowerCase().includes(word.substring(1).toLowerCase())
        // );
        const options = {
          hint: () => {
            return {
              // from: cm.getDoc().getCursor(),
              // to: cm.getDoc().getCursor(),
              from: CodeMirror.Pos(cm.getCursor().line, token.start + 1),
              to: CodeMirror.Pos(cm.getCursor().line, token.end - 1),
              list,
            };
          },
          completeSingle: false,
        };
        // setTimeout(() => {
        cm.showHint(options);
        // }, 0);
      }
    }

    function getWordAt(str: string, pos: number) {
      // Perform type conversions.
      str = String(str);
      pos = Number(pos) >>> 0;

      // Search for the word's beginning and end.
      const left = str.slice(0, pos + 1).search(/\S+$/);
      const right = str.slice(pos).search(/\s/);

      // The last word in the string is a special case.
      if (right < 0) {
        return str.slice(left);
      }

      // Return the word, using the located bounds to extract it from the string.
      return str.slice(left, right + pos);
    }

    function hintingFunction(options: any) {
      const anyhint = (CodeMirror as any).hint.anyword(cm, options);
      // const words = new Set([...anyhint.list]);
      const words = new Set(['one', 'two']);
      console.log(options);
      if (words.size > 0) {
        return {
          list: Array.from(words),
          from: anyhint.from,
          to: anyhint.to,
        };
      }
    }

    setTimeout(() => {
      cm.refresh();
    }, 0);

    return () => {
      cm.toTextArea();
    };
  }, []);

  // useEffect(() => {
  //   if (codemirrorInstance && props.note.content) {
  //     codemirrorInstance.setValue(props.note.content);
  //   }
  // }, [codemirrorInstance, props.note.content]);

  const handleChange = (event: any) => {
    // setMd(event.target.value);
    // console.log(event.target.innerHTML);
    // props.handleChange({
    //   ...props.note,
    //   content: event.target.textContent,
    // });
  };

  return (
    <div className="editor">
      <textarea id="my123" />
    </div>
  );
};

export default Editor;
