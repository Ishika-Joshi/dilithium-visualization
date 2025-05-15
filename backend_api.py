from flask import Flask, request, jsonify
from flask_cors import CORS
from dilithium_py.dilithium import Dilithium2, Dilithium3, Dilithium5
import time
import base64

app = Flask(__name__)
CORS(app)

VARIANTS = {
    "Dilithium2": Dilithium2,
    "Dilithium3": Dilithium3,
    "Dilithium5": Dilithium5
}

# --- Comparison Endpoint ---
@app.route('/api/compare', methods=['POST'])
def compare_dilithium_variants():
    data = request.get_json()
    msg = data.get('message', '').encode()
    output = []
    for name, Dilithium in VARIANTS.items():
        variant_result = {}
        variant_result['name'] = name
        start_time = time.time()
        pk, sk = Dilithium.keygen()
        keygen_time = time.time() - start_time
        variant_result['keygen_time'] = keygen_time
        variant_result['pk_size'] = len(pk)
        variant_result['sk_size'] = len(sk)
        start_time = time.time()
        sig = Dilithium.sign(sk, msg)
        signing_time = time.time() - start_time
        variant_result['signing_time'] = signing_time
        variant_result['sig_size'] = len(sig)
        start_time = time.time()
        is_valid = Dilithium.verify(pk, msg, sig)
        verification_time = time.time() - start_time
        variant_result['verification_time'] = verification_time
        variant_result['is_valid'] = is_valid
        output.append(variant_result)
    return jsonify(output)

# --- Process Endpoints ---
@app.route('/api/process/generate', methods=['POST'])
def generate_keys():
    data = request.get_json()
    variant = data.get('variant', 'Dilithium2')
    Dilithium = VARIANTS.get(variant, Dilithium2)
    start_time = time.time()
    pk, sk = Dilithium.keygen()
    keygen_time = time.time() - start_time
    return jsonify({
        "public_key": base64.b64encode(pk).decode(),
        "private_key": base64.b64encode(sk).decode(),
        "keygen_time": keygen_time,
        "pk_size": len(pk),
        "sk_size": len(sk)
    })

@app.route('/api/process/sign', methods=['POST'])
def sign_message():
    data = request.get_json()
    variant = data.get('variant', 'Dilithium2')
    Dilithium = VARIANTS.get(variant, Dilithium2)
    sk = base64.b64decode(data['private_key'])
    msg = data['message'].encode()
    start_time = time.time()
    sig = Dilithium.sign(sk, msg)
    signing_time = time.time() - start_time
    return jsonify({
        "signature": base64.b64encode(sig).decode(),
        "signing_time": signing_time,
        "sig_size": len(sig)
    })

@app.route('/api/process/verify', methods=['POST'])
def verify_signature():
    data = request.get_json()
    variant = data.get('variant', 'Dilithium2')
    Dilithium = VARIANTS.get(variant, Dilithium2)
    pk = base64.b64decode(data['public_key'])
    msg = data['message'].encode()
    sig = base64.b64decode(data['signature'])
    start_time = time.time()
    is_valid = Dilithium.verify(pk, msg, sig)
    verification_time = time.time() - start_time
    return jsonify({
        "is_valid": is_valid,
        "verification_time": verification_time
    })

# --- Simple GET endpoint for testing ---
@app.route('/api/name', methods=['GET'])
def get_name():
    return jsonify({"name": "dilithium variants comparision and process visualization"})

if __name__ == "__main__":
    app.run(debug=True)