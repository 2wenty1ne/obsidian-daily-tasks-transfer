# A - Previous Content to NoteContent Interface Conversion
Test-Methode: extractTasksFromPreviousDaily  
Testen ob das umwandeln der vorherigen Note in das NoteContent Interface richtig funktioniert.  
String aus text file (previous daily) -> NoteContent aus JSON
## A1
A1-prevContent-to-NoteContent.txt

# B - Done Tasks
Test-Methode: addPreviousContentToDaily  
Testen ob das Übertragen von nicht erfüllten Tasks und das skippen von erfüllten Tasks funktioniert.  
NoteContent aus JSON -> String aus text file (neue daily)
## B1
B1-skip-done-task-test.txt  
Mehrere Tasks, manche erfüllt, manche nicht

## B2
B2-skip-done-task-test.txt  
Mehrere Tasks, manche erfüllt, manche nicht  
Andere Reihenfolge als B1

## B3
B3-skip-done-task-test.txt  
Keine erfüllten Tasks

## B4
B4-skip-done-task-test.txt  
Alle Tasks sind erfüllt