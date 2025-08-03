def encrypt_xor(text, key):
    return ''.join(chr(ord(c) ^ key) for c in text)

def decrypt_xor(text, key):
    return encrypt_xor(text, key)  # XOR is reversible with same key
