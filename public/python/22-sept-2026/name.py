name ="Ankit Kumar Tiwari"

#10 different indexing methods to access the name variable
#1. Using positive indexing:
print(name[0])  # Output: A
#2. Using negative indexing:
print(name[-1])  # Output: i
#3. Using slicing:
print(name[0:5])  # Output: Ankit
#4. Using step indexing:
print(name[::2])  # Output: AitKmrTwr
#5. Using the len() function to access the last character:
print(name[len(name)-1])  # Output: i
#6. Using the find() method to get the index of a character:
print(name.find('K'))  # Output: 6
#7. Using the index() method to get the index of a character:
print(name.index('T'))  # Output: 11
#8. Using the split() method to access parts of the name:
print(name.split()[0])  # Output: Ankit
#9. using the upper() method to access the first character in uppercase:
print(name.upper()[2])  # Output: K
#10. Using the lower() method to access the last character in lowercase:
print(name.lower()[0])  # Output: a