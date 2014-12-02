'''
Created on Nov 9, 2014

@author: Jinali Jhaveri
'''

from sklearn.ensemble import RandomForestRegressor
clf = RandomForestRegressor(n_estimators=60, max_features='sqrt')

def learn(model, examples):
    X = [model.represent(example) for example in examples]
    y = [model.label(example) for example in examples]
    clf.fit(X, y)

def predict(model, examples):
    X = [model.represent(example) for example in examples]
    y = clf.predict(X)
    return y

import math
from sklearn.metrics import mean_squared_error

def rmse(y_true, y_pred):
    mse = mean_squared_error(y_true, y_pred)
    return math.sqrt(mse)

from sklearn.cross_validation import cross_val_score

def validate(model, examples):
    X = [model.represent(example) for example in examples]
    y = [model.label(example) for example in examples]
    scores = cross_val_score(clf, X, y, cv=2, score_func=rmse)
    return scores

def cross_validate(model):
    import training
    train_examples = training.load_examples('data_pkl/train.pkl')
    import sys
    if len(sys.argv) > 1:
        clf.set_params(n_estimators = int(sys.argv[1]))
    scores = validate(model, train_examples)
    print "RMSE: %0.6f (+/- %0.6f)" % (scores.mean(), scores.std()/2)

if __name__ == "__main__":
    import training
    import base_model as rf_model
    train_examples = training.load_examples('data_pkl/train.pkl')
    learn(rf_model, train_examples)
    test_examples = training.load_examples('data_pkl/test.pkl')
    test_ratings = predict(rf_model, test_examples)
    for i in range(len(test_examples)):
        test_examples[i]['rating'] = test_ratings[i]
    training.write_examples('results/predictions_RF.csv', test_examples)
    cross_validate(rf_model)
