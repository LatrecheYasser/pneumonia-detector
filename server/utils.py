import json
import torch
from PIL import Image
from torchvision import transforms
from torchvision.models import densenet121

cat_to_name = json.load(open("cat_to_name.json"))

transform = transforms.Compose([
    transforms.Resize((224,224)),
    transforms.ToTensor(),
    transforms.Normalize((0.485, 0.456, 0.406), (0.229, 0.224, 0.225)),
])


def process_img(image):
    image = Image.open(image)
    image = image.convert("RGB")
    image = transform(image)
    image = image.unsqueeze(0)
    return image


def predict_pneumo(model, image):
    image = process_img(image)
    with torch.no_grad():
        probs = model(image)[0]
    probs = probs.exp()
    probs, cats = probs.topk(len(cat_to_name))
    probs, cats = probs.numpy().astype('float'), cats.numpy()
    probs_cats = {cat_to_name[str(cat)]: prob for prob,cat in zip(probs, cats)}

    return probs_cats
