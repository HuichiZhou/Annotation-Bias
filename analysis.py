import json

data = []

with open("parsed_results.jsonl", "r") as f:
    for line in f:
        item = json.loads(line)
        if item['Annotation'] != item['Human Label']:
            data.append(item)

with open("analysis.jsonl", "w") as f:
    for item in data:
        f.write(json.dumps(item) + "\n")

print(f"Filtered data has been saved to 'analysis.jsonl'.")
