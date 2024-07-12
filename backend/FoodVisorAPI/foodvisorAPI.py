import requests
import json
from PIL import Image
from io import BytesIO

def download_image(image_url):
    response = requests.get(image_url)
    if response.status_code == 200:
        return BytesIO(response.content)
    else:
        response.raise_for_status()

def resize_image(image, max_size=(800, 800)):
    img = Image.open(image)
    img.thumbnail(max_size)
    output = BytesIO()
    img.save(output, format='JPEG')
    output.seek(0)
    return output

def analyze_food_image(image_url):
    url = "https://vision.foodvisor.io/api/1.0/en/analysis/"
    headers = {"Authorization": "Api-Key qrxlfvli.r2oKIQTZ0pBTQVcXBxYWxVodHWwykodI"}
    image = download_image(image_url)
    resized_image = resize_image(image)

    response = requests.post(url, headers=headers, files={"image": resized_image})
    response.raise_for_status()
    data = response.json()
    print(json.dumps(data, indent=4))
    # Extract and print nutrient information
    if 'items' in data and len(data['items']) > 0:
        total_calories = 0
        total_carbs = 0
        total_protein = 0
        total_fats = 0
        food_items = data['items'] 
        for food_item in food_items: #for each identified part of the meal
            highest_prob = food_item['food'][0] #most likely identified food for each meal part
            nutrients = highest_prob.get('food_info', {}).get('nutrition', {})
            food_name = highest_prob.get('food_info').get('display_name')
            food_quantity = highest_prob['quantity']
            if nutrients:
                calories = (nutrients.get('calories_100g', 'N/A')/100)*food_quantity
                carbohydrates = (nutrients.get('carbs_100g', 'N/A'))/100*food_quantity
                protein = (nutrients.get('proteins_100g', 'N/A'))/100*food_quantity
                fats = (nutrients.get('fat_100g', 'N/A'))/100*food_quantity
                total_calories += calories
                total_carbs += carbohydrates
                total_protein += protein
                total_fats += fats
      
                print(f"\nNutrient Information for {food_name}:")
                print(f"Quantity Size: {food_quantity} g")
                print(f"Calories: {round(calories,1)} kcal")
                print(f"Carbohydrates: {round(carbohydrates,1)} g")
                print(f"Protein: {round(protein,1)} g")
                print(f"Fats: {round(fats,1)} g")

            else:
                print("Nutrient information not found in the response.")
        print(f"\nTotal Calories: {round(total_calories,1)} kcal")
        print(f"Total Carbohydrates: {round(total_carbs,1)} g")
        print(f"Total Protein: {round(total_protein,1)} g")
        print(f"Total Fats: {round(total_fats,1)} g")
        return {
        "calories": round(total_calories,1),
        "proteins": round(total_protein,1),
        "fats": round(total_fats,1),
        "carbs": round(total_carbs,1)
        }
    else:
        print("No food items found in the response.")

