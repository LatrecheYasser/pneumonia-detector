# Pneumonia Detector
Side Project for the Deep Learning with Pytorch - Udacity challenge

Our goal was to make an easy to use application that can predict if someone
has Pneumonia or not given its chest x-ray.
![example chest x-ray]()

## Steps
- First, we trained a neural network to classify chest x-rays (Pneumonia/Normal).

  The training was done on [Kaggle](https://www.kaggle.com/yasserlatreche/pneumonia-99-accuracy-using-densenet121) but you can also find a copy of the notebook under the notebooks sub directory [here](/tree/master/notebooks)

- Then we built a RESTful API around that model so other applications can use this service. The RESTful API code is under the server sub directory [here](/tree/master/server)

- Finally we built a web application that uses the API and make it's usage really easy, the source code is under the webapp sub directory [here](/tree/master/webapp).

  You love terminals ? there is also a CLI utility for you [here](/blob/master/is_pneumo.py)

## How to use it?

#### The Web Application
TODO

#### The CLI utility
First, you need to make sure that there is an API available before using the CLI utility (is_pneumo.py). At the time of writing this, the API was hosted on http://130.211.108.207:3000/pred

Then you need to setup the new IP (or hopefully a domain name) of the API if it has changed by replacing the API_URL variable

The last step is to run it:
```
$ ./is_pneumo.py my_chest_xray.jpg
[+] It's NORMAL with a 0.996976 probability
[+] It's PNEUMONIA with a 0.003024 probability
```
