#Modules
import pandas as pd
import os as os

#pathway to csv file
csv_path = "Resources/election_data.csv"

# Read the CSV into a Pandas DataFrame
election_df = pd.read_csv(csv_path)

#count total number of rows for months
total_voters = election_df.shape[0]
print(total_voters)

#list all voters
election_df.columns

election_df["candidates"]


