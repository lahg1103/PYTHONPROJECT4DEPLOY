from newClasses import *
import app


def update_stage(x, sdict):
    #x is stage number, int
    #sdict is a dictionary of the stages containing either true or false
    if x < 4:
        s = "stage" + str(x+1)
    else:
        s = "stage4"
    
    for key in sdict:
        sdict[key] = False
        if s == key:
            print(key)
            sdict[key] = True
    return sdict

#for combat
def update_enemy(t, el):
    if len(el) > 0:
        t = el[len(el)-1]
        print(len(el))
        return t
    else:
        return "stage complete"
    



def combat(choice, u, t, el):
    if choice == "attack":
        result = u.attack(t)
        result = t.attack(u)
        print(result)
        if result[u.name] <= 0:
            print("check yes juliet")
            return {u.name: u.hp, t.name: t.hp, "message": "you lose"}
        elif result[t.name] <= 0:
            if (len(el) > 0):
                return {u.name: u.hp, t.name: t.hp, "message": "you win"}  
        else:
            return result
    elif choice == "heal":
        print(u.hp)
        print(t.hp)
        return u.heal()

