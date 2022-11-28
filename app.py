from flask import Flask, render_template, make_response, request, jsonify
import subfuncs
import random




app = Flask(__name__)


count = 0




@app.route('/')
def index():
    global count
    count+=1
    if (count == 1):
        global carlos
        global elist
        global stages
        global target
        # for map updating
        stages = {"stage1": True, "stage2": False, "stage3": False, "stage4": False}
        carlos = subfuncs.unit("Carlos", "static/images/CarlosPortrait.png", 1)
        elist = []
        for x in range(5):
         elist.append(subfuncs.unit("Bandit" + str(x), "static/images/gruntportait.png", 1, index=x-1))
        target = elist[len(elist)-1]
        count = 0
    return render_template('index.html', unit=carlos, elist=elist, target=target)



@app.route('/getMap', methods=['GET', 'POST'])
def returnMap():
    global stages
    if request.method == 'GET':
        return jsonify(stages)
    elif request.method == 'POST':
        currentStage = request.get_json()
        stages = subfuncs.update_stage(currentStage, stages)
        return jsonify(stages)
    


@app.route('/attackTurn/', methods=['GET', 'POST'])
def attackTurn():
    global carlos
    global elist
    global target
    global choice
    
    if request.method == 'POST':
        msg = request.get_json()
        global choice
        choice = msg["choice"]
        
        return 'Success', 200
    elif request.method == 'GET':
        

        print(choice)
        if choice == "attack":
            outcome = subfuncs.combat(choice, carlos, target, elist)
            for key in outcome:
                if key == "message":
                    if outcome[key] == "you lose":
                        print(outcome[key])
                        carlos.hp = carlos.max_hp
                        target.hp = target.max_hp
                    elif outcome[key] == "you win":
                        

                        if len(elist) >= 0 :
                            elist.pop()
                            carlos.money += random.randint(15, 35)
                            target = subfuncs.update_enemy(target, elist)
                            if target == "stage complete":
                                return jsonify({"message": "stage complete"})
                        else:
                            return jsonify({"message": "stage complete"})
            return jsonify(outcome)
        elif choice == "heal":
            outcome = subfuncs.combat(choice, carlos, target, elist)
            return jsonify(outcome)

@app.route('/getHP', methods=['GET', 'POST'])
def getHP():
    if request.method == 'GET' :
        return jsonify({carlos.name: carlos.hp, "target": target.hp})

if __name__ == "__main__":
    app.run(debug=True)
