from flask import Flask, request, jsonify
import foodvisorAPI # Import your foodvisorAPI.py functions

app = Flask(__name__)

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.json
    image_url = data.get('image_url')
    app.logger.info(f'Received image URL: {image_url}')

    if not image_url:
        app.logger.error('Image URL is required')
        return jsonify({"error": "Image URL is required"}), 400

    try:
        analysis_result = foodvisorAPI.analyze_food_image(image_url)
        return jsonify(analysis_result)
    except Exception as e:
        app.logger.error(f'Error analyzing image: {e}')
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
