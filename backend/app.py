# import os
# import base64
# import subprocess
# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from io import BytesIO
# import tempfile

# app = Flask(__name__)
# CORS(app)

# # Temporary directory to store video files
# TEMP_DIR = tempfile.gettempdir()

# # Ensure the directory exists
# os.makedirs(TEMP_DIR, exist_ok=True)

# @app.route('/process-video', methods=['POST'])
# def process_video():
#     try:
#         # Step 1: Get the base64 string from the request
#         data = request.json
#         video_b64 = data.get('video_b64')

#         if not video_b64:
#             return jsonify({"error": "No video provided"}), 400

#         # Step 2: Decode the base64 string into video data
#         video_data = base64.b64decode(video_b64)

#         # Step 3: Save the video to a file
#         video_filename = os.path.join(TEMP_DIR, "uploaded_video.mp4")
#         with open(video_filename, 'wb') as video_file:
#             video_file.write(video_data)

#         # Step 4: Run the subprocess commands
#         colmap_command = [
#             "python", "scripts/colmap2nerf.py",
#             "--video_in", video_filename,
#             "--video_fps", "4",
#             "--run_colmap", "--aabb_scale", "16", "--overwrite"
#         ]

#         subprocess.run(colmap_command, check=True)

#         # Step 5: Run any other subprocesses as needed
#         # Example: Replace with additional commands if needed
#         subprocess.run(["python", "another_script.py", "--arg", "value"], check=True)

#         # Return success
#         return jsonify({"message": "Video processed successfully"}), 200

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# if __name__ == '__main__':
#     app.run(debug=True, host='0.0.0.0', port=5000)

from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import subprocess
import tempfile

app = Flask(__name__)

# Allow CORS for all origins or specify allowed origins
CORS(app, resources={r"/*": {"origins": "*"}})

# Temporary directory to store video files
TEMP_DIR = tempfile.gettempdir()

# Ensure the directory exists
os.makedirs(TEMP_DIR, exist_ok=True)

@app.route('/process-video', methods=['POST'])
def process_video():
    try:
        # Check if a file was uploaded
        if 'video' not in request.files:
            return jsonify({"error": "No video file provided"}), 400

        # Retrieve the video file
        video_file = request.files['video']

        # Save the video to a temporary file
        video_filename = os.path.join(TEMP_DIR, "uploaded_video.mp4")
        video_file.save(video_filename)

        return jsonify({"message": "Video processed successfully"}), 200

        # Run the subprocess commands
        colmap_command = [
            "python", "scripts/colmap2nerf.py",
            "--video_in", video_filename,
            "--video_fps", "4",
            "--run_colmap", "--aabb_scale", "16", "--overwrite"
        ]

        subprocess.run(colmap_command, check=True)

        # Run any other subprocesses as needed
        subprocess.run(["python", "another_script.py", "--arg", "value"], check=True)

        # Return success
        # return jsonify({"message": "Video processed successfully"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
