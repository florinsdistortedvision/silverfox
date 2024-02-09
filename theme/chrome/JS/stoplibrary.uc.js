// ==UserScript==
// @name         Silverfox - Stop some keyboard shortcuts
// @version      1.0
// @description  Prevents opening Library and History native windows, since they are "pages" now
// @author       florin
// ==/UserScript==


// Disable History shortcut
(function() {
    _ucUtils.registerHotkey({
      id: "preventCtrlH",
      key: "h",
      modifiers: "Ctrl",
    }, function(win, hotkey) {
      const doc = win.document;
      doc.addEventListener("keydown", function(event) {
        if (event.ctrlKey && event.key === "h") {
          event.preventDefault();
        }
      });
    });
  })();
  
  // Disable both Library shortcuts
  (function() {
    _ucUtils.registerHotkey({
      id: "preventCtrlShifth",
      key: "h",
      modifiers: "Ctrl Shift",
    }, function(win, hotkey) {
      const doc = win.document;
      doc.addEventListener("keydown", function(event) {
        if (event.ctrlKey && event.shiftKey && event.key === "h") {
          event.preventDefault();
        }
      });
    });
    
    _ucUtils.registerHotkey({
      id: "preventCtrlShiftO",
      key: "o",
      modifiers: "Ctrl Shift",
    }, function(win, hotkey) {
      const doc = win.document;
      doc.addEventListener("keydown", function(event) {
        if (event.ctrlKey && event.shiftKey && event.key === "o") {
          event.preventDefault();
        }
      });
    });
  })();
  