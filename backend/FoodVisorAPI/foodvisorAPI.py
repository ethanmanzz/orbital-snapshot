import requests
import json
from PIL import Image
from io import BytesIO
import logging
import sys

logging.basicConfig(level=logging.INFO, stream=sys.stdout)

def download_image(image_url):
    logging.info(f"Downloading image from URL: {image_url}")
    response = requests.get(image_url)
    if response.status_code == 200:
        logging.info("Image downloaded successfully")
        return BytesIO(response.content)
    else:
        logging.error(f"Failed to download image. Status code: {response.status_code}")
        response.raise_for_status()

def resize_image(image, max_size=(800, 800)):
    logging.info("Resizing image")
    img = Image.open(image)
    img.thumbnail(max_size)
    output = BytesIO()
    img.save(output, format='JPEG')
    output.seek(0)
    logging.info("Image resized successfully")
    return output

def analyze_food_image(image_url):
    url = "https://vision.foodvisor.io/api/1.0/en/analysis/"
    headers = {"Authorization": "Api-Key qrxlfvli.r2oKIQTZ0pBTQVcXBxYWxVodHWwykodI"}
    logging.info(f"Starting analysis for image URL: {image_url}")
    image = download_image(image_url)
    resized_image = resize_image(image)
    logging.info("Sending image for analysis")

    response = requests.post(url, headers=headers, files={"image": resized_image})
    response.raise_for_status()
    data = response.json()
    logging.info(f"Received response: {json.dumps(data, indent=4)}")

    # Extract and print nutrient information
    if 'items' in data and len(data['items']) > 0:
        total_calories = 0
        total_carbs = 0
        total_protein = 0
        total_fats = 0
        food_items = data['items']
        for food_item in food_items:
            highest_prob = food_item['food'][0]
            nutrients = highest_prob.get('food_info', {}).get('nutrition', {})
            food_name = highest_prob.get('food_info').get('display_name')
            food_quantity = highest_prob['quantity']
            if nutrients:
                calories = (nutrients.get('calories_100g', 'N/A') / 100) * food_quantity
                carbohydrates = (nutrients.get('carbs_100g', 'N/A')) / 100 * food_quantity
                protein = (nutrients.get('proteins_100g', 'N/A')) / 100 * food_quantity
                fats = (nutrients.get('fat_100g', 'N/A')) / 100 * food_quantity
                total_calories += calories
                total_carbs += carbohydrates
                total_protein += protein
                total_fats += fats

                logging.info(f"Nutrient Information for {food_name}:")
                logging.info(f"Quantity Size: {food_quantity} g")
                logging.info(f"Calories: {round(calories,1)} kcal")
                logging.info(f"Carbohydrates: {round(carbohydrates,1)} g")
                logging.info(f"Protein: {round(protein,1)} g")
                logging.info(f"Fats: {round(fats,1)} g")

            else:
                logging.warning("Nutrient information not found in the response.")

        logging.info(f"Total Calories: {round(total_calories,1)} kcal")
        logging.info(f"Total Carbohydrates: {round(total_carbs,1)} g")
        logging.info(f"Total Protein: {round(total_protein,1)} g")
        logging.info(f"Total Fats: {round(total_fats,1)} g")

        return {
            "calories": round(total_calories,1),
            "proteins": round(total_protein,1),
            "fats": round(total_fats,1),
            "carbs": round(total_carbs,1)
        }
    else:
        logging.warning("No food items found in the response.")
        return {"error": "No food items found in the response."}