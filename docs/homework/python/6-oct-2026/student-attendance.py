Total_student = ["Raj", "Amit", "Jay", "Payal", "Priya", "Rahul", "Pavan", "Kiran", "Prachi"]
present_attendance = ("Raj", "Jay", "Payal", "Priya", "Pavan", "Kiran")


for student in Total_student:
    if student in present_attendance:
        print(f"{student} is present.")
    else:
        print(f"{student} is absent.")
