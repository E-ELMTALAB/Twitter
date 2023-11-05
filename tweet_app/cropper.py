from PIL import Image
import os

def crop_to_square(input_image_path):
    image = Image.open(input_image_path)

    # Get the dimensions of the image
    width, height = image.size

    # Determine the size of the square crop
    size = min(width, height)

    # Calculate the coordinates for the square crop
    left = (width - size) / 2
    top = (height - size) / 2
    right = (width + size) / 2
    bottom = (height + size) / 2

    # Crop the image to the square size
    image = image.crop((left, top, right, bottom))
    # image.show()
    # Save the cropped image
    image.save(input_image_path , optimize=True, quality=35)

def crop_images_in_directory(input_dir):

    # List all image files in the input directory
    for folder in os.listdir(input_dir):
        for filename in os.listdir(os.path.join(input_dir , folder)):
            if filename.endswith((".jpg", ".jpeg", ".png", ".bmp")):
                input_image_path = os.path.join(input_dir, folder , filename)
                print("the input image path : " , input_image_path)
                resize_image(input_image_path , 640)
                # output_image_path = os.path.join(output_dir, folder ,  filename)
                # crop_to_square(input_image_path)
                print(f"resized : {input_image_path} -> {input_image_path}")

def resize_image(input_image_path, width):
    image = Image.open(input_image_path)
    aspect_ratio = float(width) / image.size[0]
    height = int(image.size[1] * aspect_ratio)
    resized_image = image.resize((width, height), Image.ANTIALIAS)
    resized_image.save(input_image_path)




if __name__ == "__main__":
    input_directory = r"C:\python\django\twitter\media"
    output_directory = r"C:\python\django\twitter\media"

    crop_images_in_directory(input_directory)