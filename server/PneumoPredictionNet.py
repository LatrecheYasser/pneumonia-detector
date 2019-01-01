from torchvision.models import densenet121
from torch import nn
from collections import OrderedDict
import torch

def new(state_dict_path="state_dicts/saved_state.pth"):
    model = densenet121(pretrained=True)
    model.classifier = nn.Sequential(OrderedDict([
                ('fcl1', nn.Linear(1024,256)),
                ('dp1', nn.Dropout(0.3)),
                ('r1', nn.ReLU()),
                ('fcl2', nn.Linear(256,32)),
                ('dp2', nn.Dropout(0.3)),
                ('r2', nn.ReLU()),
                ('fcl3', nn.Linear(32,2)),
                ('out', nn.LogSoftmax(dim=1)),
                ]))
    device = ('cuda' if torch.cuda.is_available() else 'cpu')
    model.load_state_dict(torch.load(state_dict_path, map_location=device))

    model.eval()
    for param in model.parameters():
        param.requires_grad = False

    return model
