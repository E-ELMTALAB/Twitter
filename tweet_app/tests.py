from PIL import Image

def reduce_image_size(input_image_path, output_image_path, max_width, max_height, quality=85):
    # Open the input image
    image = Image.open(input_image_path)

    # Calculate the new dimensions while preserving the aspect ratio
    width, height = image.size
    if width > max_width or height > max_height:
        image.thumbnail((max_width, max_height))

    # Save the resized image with the specified quality
    image.save(output_image_path, optimize=True, quality=quality)

if __name__ == "__main__":
    input_image_path = r"C:\python\django\twitter\media\profile_pictures_path\pexels-koolshooters-9944897.jpg"
    output_image_path = r"C:\python\django\twitter\media\profile_pictures_path\pexels-koolshooters-9944897.jpg"
    max_width = 4480
    max_height = 4480
    quality = 50  # Adjust the quality as needed

    reduce_image_size(input_image_path, output_image_path, max_width, max_height, quality)
