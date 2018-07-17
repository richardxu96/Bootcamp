
#Modules
import pandas as pd
import os as os

#pathway to csv file
csv_path = "Resources/budget_data.csv"

# Read the CSV into a Pandas DataFrame
budget_df = pd.read_csv(csv_path)

# Print the first five rows of data to the screen
budget_df.head(10)

#count total number of rows for months
total_months = budget_df.shape[0]
print(total_months)

#The total net amount of "Profit/Losses" over the entire period
total_revenue = budget_df['Revenue'].sum()
print (total_revenue)

#The average change in "Profit/Losses" between months over the entire period
average_change = round(total_revenue/total_months, 2)
print(average_change)

#The greatest increase in profits (date and amount) over the entire period
#use a for loop to check between revenue, if the value is greater, store the new value as variable
#greatest_revenue = 
#for loop
#if revenue1 < revenue 2, store revenue 2
#else if revenue1 >= revenue 2, don't store revenue 2
#print(greatest_revenue + date)

#The greatest decrease in losses (date and amount) over the entire period
#use a loop to check beteen revenue, if the differences is greater, store the new value. if not, then move past it

