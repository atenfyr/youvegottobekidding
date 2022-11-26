import urllib.request, imagehash
from PIL import Image

MAX_PROBLEMS = 19

PREFIX = [
    "https://web.archive.org/web/20170903214215im_/http://staging.pbskids.org/arthur/i/games/youkidding/",
    "https://web.archive.org/web/20130329190429im_/http://pbskids.org/arthur/i/games/youkidding/",
    "https://web.archive.org/web/20170903214215im_/http://www-tc.pbskids.org/arthur/i/games/youkidding/",
]
def download(file_name, prefix_num = 0):
    try:
        urllib.request.urlretrieve(PREFIX[prefix_num] + file_name, "./assets/" + file_name)
        print("Downloaded: " + file_name)
    except urllib.error.HTTPError:
        prefix_num += 1
        if prefix_num < len(PREFIX):
            return download(file_name, prefix_num)
        print("Failed: " + file_name)


# test availability
# https://web.archive.org/web/20130329190551/http://pbskids.org/cgi-registry/arthur/kiddingquiz.pl?phase=score&done=0&score=2
"""for i in range(21):
    try:
        urllib.request.urlretrieve("https://web.archive.org/web/20130303090548/http://staging.pbskids.org/cgi-registry/arthur/kiddingquiz.pl?phase=score&done=" + str(i) + "&score=2", "blah.html")
        print("Worked")
    except urllib.error.HTTPError:
        try:
            urllib.request.urlretrieve("https://web.archive.org/web/20130303090548/http://pbskids.org/cgi-registry/arthur/kiddingquiz.pl?phase=score&done=" + str(i) + "&score=2", "blah.html")
            print("Worked")
        except urllib.error.HTTPError:
            print("No " + str(i))
print("Done")"""

# stairs
for i in range(13):
    download(f"stairs{i}.gif")
    download(f"{i}_step.gif")

for i in range(MAX_PROBLEMS):
    #download(f"problem{i+1}.gif")
    #download(f"tip{i+1}.gif")
    pass
    for j in range(3):
        #download(f"choice{j+1}_{i+1}.gif")
        #download(f"choice{j+1}_{i+1}_roll.gif")
        #download(f"outcome{i+1}_{j+1}.gif")
        pass

for i in range(3):
    #download(f"move{i}.gif")
    pass

# Generate key
PORTRAIT_SIZE = (120, 120)
def get_hash_from_file_name(file_name):
    if file_name in MAP_OF_HASHES: return MAP_OF_HASHES[file_name]

    im = Image.open("./assets/" + file_name)
    width, height = im.size
    im2 = im.crop((width - PORTRAIT_SIZE[0], 0, width, PORTRAIT_SIZE[1])).convert("RGBA")
    im3 = Image.alpha_composite(Image.new("RGBA", im2.size, (0,0,0)), im2)
    return str(imagehash.phash(im3))

MAP_OF_HASHES = {}
MAP_OF_HASHES[get_hash_from_file_name("outcome1_1.gif")] = 2
MAP_OF_HASHES[get_hash_from_file_name("outcome1_2.gif")] = 1
MAP_OF_HASHES[get_hash_from_file_name("outcome1_3.gif")] = 0
MAP_OF_HASHES[get_hash_from_file_name("outcome5_1.gif")] = 0
MAP_OF_HASHES[get_hash_from_file_name("outcome5_3.gif")] = 2
MAP_OF_HASHES[get_hash_from_file_name("outcome7_1.gif")] = 0
MAP_OF_HASHES[get_hash_from_file_name("outcome7_2.gif")] = 1
MAP_OF_HASHES[get_hash_from_file_name("outcome7_3.gif")] = 2
MAP_OF_HASHES[get_hash_from_file_name("outcome8_1.gif")] = 0
MAP_OF_HASHES[get_hash_from_file_name("outcome8_3.gif")] = 2
MAP_OF_HASHES[get_hash_from_file_name("outcome10_1.gif")] = 1
MAP_OF_HASHES[get_hash_from_file_name("outcome10_2.gif")] = 2
MAP_OF_HASHES[get_hash_from_file_name("outcome10_3.gif")] = 0
MAP_OF_HASHES[get_hash_from_file_name("outcome12_1.gif")] = 0
MAP_OF_HASHES[get_hash_from_file_name("outcome12_2.gif")] = 2
MAP_OF_HASHES[get_hash_from_file_name("outcome16_1.gif")] = 1
MAP_OF_HASHES[get_hash_from_file_name("outcome17_1.gif")] = 0
MAP_OF_HASHES[get_hash_from_file_name("outcome17_2.gif")] = 0
MAP_OF_HASHES[get_hash_from_file_name("outcome17_3.gif")] = 2
MAP_OF_HASHES[get_hash_from_file_name("outcome19_1.gif")] = 2
MAP_OF_HASHES[get_hash_from_file_name("outcome19_2.gif")] = 0
MAP_OF_HASHES[get_hash_from_file_name("outcome19_3.gif")] = 1

ANSWER_KEY = {}
for problem in range(MAX_PROBLEMS):
    for choice in range(3):
        file_name = f"outcome{problem+1}_{choice+1}"
        comparison_hash = get_hash_from_file_name(file_name + ".gif")
        if comparison_hash in MAP_OF_HASHES:
            ANSWER_KEY[file_name] = MAP_OF_HASHES[comparison_hash]
            #print(file_name + ": " + str(MAP_OF_HASHES[comparison_hash]))
        else:
            print(file_name + ": unknown")

print(ANSWER_KEY)