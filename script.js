// Font family and size handlers
document.getElementById('fontFamily').addEventListener('change', function() {
    document.execCommand('fontName', false, this.value);
});

document.getElementById('fontSize').addEventListener('change', function() {
    document.execCommand('fontSize', false, this.value);
});

// Color handlers
function changeTextColor(color) {
    document.execCommand('foreColor', false, color);
}

function changeBackgroundColor(color) {
    document.execCommand('hiliteColor', false, color);
}

// Search and replace functionality
function searchText() {
    const searchTerm = document.getElementById('searchInput').value;
    const editorContent = document.getElementById('editor').innerHTML;
    
    // Remove previous highlights
    const cleanContent = editorContent.replace(/<mark class="highlight">(.*?)<\/mark>/g, '$1');
    
    if (searchTerm) {
        const regex = new RegExp(searchTerm, 'gi');
        const highlightedContent = cleanContent.replace(regex, match => 
            `<mark class="highlight">${match}</mark>`
        );
        document.getElementById('editor').innerHTML = highlightedContent;
    } else {
        document.getElementById('editor').innerHTML = cleanContent;
    }
}

function replaceText() {
    const searchTerm = document.getElementById('searchInput').value;
    const replaceTerm = document.getElementById('replaceInput').value;
    const selection = window.getSelection();
    
    if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const selectedText = range.toString();
        
        if (selectedText.toLowerCase() === searchTerm.toLowerCase()) {
            range.deleteContents();
            range.insertNode(document.createTextNode(replaceTerm));
        }
    }
    
    updateWordAndCharCount();
}

function replaceAllText() {
    const searchTerm = document.getElementById('searchInput').value;
    const replaceTerm = document.getElementById('replaceInput').value;
    const editorContent = document.getElementById('editor').innerHTML;
    
    if (searchTerm) {
        const regex = new RegExp(searchTerm, 'gi');
        const newContent = editorContent.replace(regex, replaceTerm);
        document.getElementById('editor').innerHTML = newContent;
    }
    
    updateWordAndCharCount();
}

// String Methods
function getEditorText() {
    return document.getElementById('editor').innerText;
}

function showMethodResult(result) {
    document.getElementById('methodResult').innerHTML = `Resultado: ${result}`;
}

function showLength() {
    const text = getEditorText();
    showMethodResult(`length: ${text.length}`);
}

function showCharAt() {
    const text = getEditorText();
    const position = prompt('Ingrese la posición (0-based):', '0');
    if (position !== null) {
        showMethodResult(`charAt(${position}): "${text.charAt(parseInt(position))}"`)
    }
}

function showCharCodeAt() {
    const text = getEditorText();
    const position = prompt('Ingrese la posición (0-based):', '0');
    if (position !== null) {
        showMethodResult(`charCodeAt(${position}): ${text.charCodeAt(parseInt(position))}`);
    }
}

function showAt() {
    const text = getEditorText();
    const position = prompt('Ingrese la posición (puede ser negativa):', '0');
    if (position !== null) {
        showMethodResult(`at(${position}): "${text.at(parseInt(position))}"`);
    }
}

function showBracket() {
    const text = getEditorText();
    const position = prompt('Ingrese la posición (0-based):', '0');
    if (position !== null) {
        showMethodResult(`[${position}]: "${text[parseInt(position)]}"`);
    }
}

function showSlice() {
    const text = getEditorText();
    const start = prompt('Ingrese la posición inicial:', '0');
    const end = prompt('Ingrese la posición final (opcional):', '');
    if (start !== null) {
        const result = end ? text.slice(parseInt(start), parseInt(end)) : text.slice(parseInt(start));
        showMethodResult(`slice(${start}${end ? `, ${end}` : ''}): "${result}"`);
    }
}

function showSubstring() {
    const text = getEditorText();
    const start = prompt('Ingrese la posición inicial:', '0');
    const end = prompt('Ingrese la posición final (opcional):', '');
    if (start !== null) {
        const result = end ? text.substring(parseInt(start), parseInt(end)) : text.substring(parseInt(start));
        showMethodResult(`substring(${start}${end ? `, ${end}` : ''}): "${result}"`);
    }
}

function showSubstr() {
    const text = getEditorText();
    const start = prompt('Ingrese la posición inicial:', '0');
    const length = prompt('Ingrese la longitud:', '');
    if (start !== null) {
        const result = length ? text.substr(parseInt(start), parseInt(length)) : text.substr(parseInt(start));
        showMethodResult(`substr(${start}${length ? `, ${length}` : ''}): "${result}"`);
    }
}

function showToUpperCase() {
    const text = getEditorText();
    showMethodResult(`toUpperCase(): "${text.toUpperCase()}"`);
}

function showToLowerCase() {
    const text = getEditorText();
    showMethodResult(`toLowerCase(): "${text.toLowerCase()}"`);
}

function showConcat() {
    const text = getEditorText();
    const str = prompt('Ingrese el texto a concatenar:', '');
    if (str !== null) {
        showMethodResult(`concat("${str}"): "${text.concat(str)}"`);
    }
}

function showTrim() {
    const text = getEditorText();
    showMethodResult(`trim(): "${text.trim()}"`);
}

function showTrimStart() {
    const text = getEditorText();
    showMethodResult(`trimStart(): "${text.trimStart()}"`);
}

function showTrimEnd() {
    const text = getEditorText();
    showMethodResult(`trimEnd(): "${text.trimEnd()}"`);
}

function showPadStart() {
    const text = getEditorText();
    const length = prompt('Ingrese la longitud deseada:', '10');
    const padString = prompt('Ingrese el carácter de relleno:', ' ');
    if (length !== null && padString !== null) {
        showMethodResult(`padStart(${length}, "${padString}"): "${text.padStart(parseInt(length), padString)}"`);
    }
}

function showPadEnd() {
    const text = getEditorText();
    const length = prompt('Ingrese la longitud deseada:', '10');
    const padString = prompt('Ingrese el carácter de relleno:', ' ');
    if (length !== null && padString !== null) {
        showMethodResult(`padEnd(${length}, "${padString}"): "${text.padEnd(parseInt(length), padString)}"`);
    }
}

function showRepeat() {
    const text = getEditorText();
    const count = prompt('Ingrese el número de repeticiones:', '2');
    if (count !== null) {
        showMethodResult(`repeat(${count}): "${text.repeat(parseInt(count))}"`);
    }
}

function showSplit() {
    const text = getEditorText();
    const separator = prompt('Ingrese el separador (dejar vacío para dividir por caracteres):', ' ');
    const result = text.split(separator || '');
    showMethodResult(`split("${separator}"): [${result.map(item => `"${item}"`).join(', ')}]`);
}

// Word and character count
function updateWordAndCharCount() {
    const text = document.getElementById('editor').innerText;
    const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
    const charCount = text.length;
    
    document.getElementById('wordCount').textContent = `Palabras: ${wordCount}`;
    document.getElementById('charCount').textContent = `Caracteres: ${charCount}`;
}

// Add event listeners
document.getElementById('editor').addEventListener('input', updateWordAndCharCount);
document.getElementById('editor').addEventListener('paste', function(e) {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
});

// Initialize word and character count
updateWordAndCharCount();