import re
import os
import json
from config import *

def add_tags(pattern, text, tag, func=lambda x: x):
    assert text, 'empty text'
    find = re.finditer(pattern, func(text))
    new_str = ''
    i = 0
    for f in find:
        while i < f.start(0):
            new_str += text[i]
            i += 1
        else:
            new_str += f'<{tag}>{text[f.start(0):f.end(0)]}</{tag}>'
            i = f.end(0)
            
    new_str += text[i:]
    return new_str

with open(parsed_json) as f:
    dict_ = json.load(f)

apt_pattern = re.compile(r'apt\d{1,4}')    
cve_pattern = re.compile(r'cve-\d{4}-\d{4,7}')

country_pattern = '|'.join(dict_['COUNTRY'])
country_pattern = re.compile(r'\b('+ country_pattern + r')\b')

mitre_pattern = '|'.join(re.sub(r'[\W_]', ' ', i).lower() 
         for i in dict_['MITRE_ATTACK'])
mitre_pattern = re.compile(r'\b('+ mitre_pattern + r')\b')

month = 'January, February, March, April, May, June, July, August, September, October, November, December, Aug'.split(', ')
month += [t.upper() for t in month]

month = '|'.join(t for t in month)
time_pattern = re.compile(fr'(?:(?:\d+\s)?(?:\b(?:{month})\b))')



def main():
    with open(input_file, encoding='utf-8') as f:
        text = f.read()
    text = add_tags(apt_pattern, text, 'APT', func=lambda x: x.lower())
    text = add_tags(cve_pattern, text, 'CVE', func=lambda x: x.lower())
    text = add_tags(mitre_pattern, text, 'MITRE_ATTACK', func=lambda text: re.sub(r'\W', ' ', text).lower())
    text = add_tags(country_pattern, text, 'COUNTRY', func=lambda text: re.sub(r'\W', ' ', text))
    text = add_tags(time_pattern, text, 'TIMESTAMP', func=lambda text: re.sub(r'\W', ' ', text))
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(text)
        
if __name__ == '__main__':
    main()
    os.system("cat output.txt | grep \"</\" > output2.txt")
    
    with open('output2.txt') as f:
        size = sum(1 for _ in f)
    
    rezul,rezul2,rezul3,rezul4,rezul5 = set(),set(),set(),set(),set()

    f = open('output2.txt')
    for i in range(size):
        temptext = f.readline()
        if("<MITRE_ATTACK>" in temptext):
            start = "<MITRE_ATTACK>"
            end = "</MITRE_ATTACK>"
            temptext2 = re.search('{}.*?{}'.format(*map(re.escape, [start, end])), temptext, re.M).group()
            rezul.add(temptext2[14:-15])
        if("<COUNTRY>" in temptext):
            start = "<COUNTRY>"
            end = "</COUNTRY>"
            temptext2 = re.search('{}.*?{}'.format(*map(re.escape, [start, end])), temptext, re.M).group()
            rezul2.add(temptext2[9:-10])
        if("<TIMESTAMP>" in temptext):
            start = "<TIMESTAMP>"
            end = "</TIMESTAMP>"
            temptext2 = re.search('{}.*?{}'.format(*map(re.escape, [start, end])), temptext, re.M).group()
            rezul3.add(temptext2[11:-12])
        if("<CVE>" in temptext):
            start = "<CVE>"
            end = "</CVE>"
            temptext2 = re.search('{}.*?{}'.format(*map(re.escape, [start, end])), temptext, re.M).group()
            rezul4.add(temptext2[5:-6])
        if("<APT>" in temptext):
            start = "<APT>"
            end = "</APT>"
            temptext2 = re.search('{}.*?{}'.format(*map(re.escape, [start, end])), temptext, re.M).group()
            rezul5.add(temptext2[5:-6])

rezultext = ""
for i in rezul:
    rezultext += i

rezul2text = ""
for i in rezul2:
    rezul2text += i

rezul3text = ""
for i in rezul3:
    rezul3text += i

rezul4text = ""
for i in rezul4:
    rezul4text += i

rezul5text = ""
for i in rezul5:
    rezul5text += i
rezul5text = rezul5text[14:-15]

threats = {"label":"Родион, где названия?","date":rezul3text,"data":{"Группировки:":rezul5text,"CVE:":rezul4text}}
print(json.dumps(threats))