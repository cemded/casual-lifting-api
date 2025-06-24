from flask import Flask, request, jsonify

app = Flask(__name__)

class PRCalc:
    def __init__(self, weight, reps, unit="kg"):
        self.unit = unit.lower()
        self.weight = self.convert_to_kg(float(weight))
        self.reps = int(reps)

    def convert_to_kg(self, weight):
        return weight * 0.453592 if self.unit == "lbs" else weight

    def convert_from_kg(self, weight):
        return round(weight * 2.20462, 2) if self.unit == "lbs" else round(weight, 2)

    def PR(self):
        if self.reps < 1:
            return "Invalid"
        elif self.reps == 1:
            pr = self.weight
        elif 2 <= self.reps <= 3:
            pr = self.weight / 0.95
        elif 4 <= self.reps <= 5:
            pr = self.weight / 0.90
        elif 6 <= self.reps <= 7:
            pr = self.weight / 0.85
        elif 8 <= self.reps <= 9:
            pr = self.weight / 0.80
        elif 10 <= self.reps <= 11:
            pr = self.weight / 0.75
        elif 12 <= self.reps <= 15:
            pr = self.weight / 0.70
        elif 16 <= self.reps <= 18:
            pr = self.weight / 0.65
        elif 19 <= self.reps <= 20:
            pr = self.weight / 0.60
        else:
            return "Bu tekrar için PR tahmini yapılamıyor."
        return self.convert_from_kg(pr)

@app.route("/calculate", methods=["POST"])
def calculate_pr():
    data = request.json

    weight = data.get("weight")
    reps = data.get("reps")
    unit = data.get("unit", "kg")

    try:
        calc = PRCalc(weight, reps, unit)
        pr = calc.PR()
        return jsonify({"result": f"{pr} {unit.upper()}"})
    except Exception as e:
        return jsonify({"error": "Hatalı giriş"}), 400

if __name__ == "__main__":
    app.run(debug=True)
