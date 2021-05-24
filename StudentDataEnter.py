import csv
continueRun = True

while continueRun == True:
    TempData = input("Data: ")
    with open("answers.txt", "a") as myfile:
        myfile.write("\n"+TempData)
    if input("Another? ") == "N":
        continueRun = False
