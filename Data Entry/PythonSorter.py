Studs = []
f = open("Names.txt", "r")
for row in f:
    arraytemp = row.split(',')
    arraytemp[len(arraytemp)-1] = arraytemp[len(arraytemp)-1].replace("\n", "")
    Studs += arraytemp
for item in Studs:
    item = item.replace("\n","")
print(Studs)
ss = open("Surveyed.txt", "r")
pee = ""
for row in ss:
    pee += row
surveyed = pee.split("\n")
for item in Studs:
    if not item in surveyed:    
       print(item)

