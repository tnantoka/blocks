'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('blocksApp.services', []).
  value('version', '0.1.0').
  factory('Question', function () {
   
    function Question() {
      /* Public properties */
      this.context = _.sample(contexts)
      this.returnType = _.sample(returnTypes)
      this.typeName = typeName(this.context);
      this.blockName = blockName();
      this.parameters = Math.random() < 0.3 ? ['void'] : _.sample(parameters, _.random(1, 3));

      this.key = _.invert(contexts)[this.context];

      this.parameterTypes = _.map(this.parameters, function(parameter) {
        return parameter.replace(/[^*\s]+$/, '').replace(/\s+$/, ''); 
      });
      this.input = placeholders[this.key]({ answer: '' });
    }
   
    /* Public methods */
    Question.prototype.score = function() {
      var input = _.str.trim(this.input);
      var fullAnswer = _.str.chars(this.fullAnswer());

      var count = _.str.levenshtein(input, this.fullAnswer());
      this.count = count;
      if (count == 0) {
        this.isCorrect = true;
      }
    };

    Question.prototype.answer = function() {
      var template = templates[this.key];
      return template(this);
    };

    Question.prototype.fullAnswer = function() {
      return placeholders[this.key]({ answer: this.answer() });
    };

    Question.prototype.join = function(a) {
      return a.join(", ")
    };

    Question.prototype.omitReturnType = function(returnType) {
      return returnType == 'void' ? '' : returnType; 
    };

    Question.prototype.omitParameters = function(parameters) {
      parameters = this.join(parameters);
      return (parameters == '' || parameters == 'void') ? '' : '(' + parameters + ') ';
    };

    /* Private properties */
    var contexts = {
      LOCAL: 'local variable',
      PROP: 'property',
      PARAM: 'method parameter',
      ARG: 'argument to a method call',
      TYPE: 'typedef',
      WEAK: 'weakSelf',
      STRONG: 'strongSelf',
    };

    var returnTypes = ['void', 'int', 'float', 'NSInteger', 'CGFloat', 'NSString *', 'NSArray *', 'NSDictionary *'];
    var parameters = ['int num', 'CGPoint point', 'CGSize size', 'CGRect rect', 'NSString *str', 'NSError *err'];

    var templates = {
      LOCAL: '<%= returnType %>(^<%= blockName %>)(<%= join(parameterTypes) %>) = ^<%= omitReturnType(returnType) %><%= omitParameters(parameters) %>{};',
      PROP: '<%= returnType %> (^<%= blockName %>)(<%= join(parameterTypes) %>);',
      PARAM: '(<%= returnType %> (^)(<%= join(parameterTypes) %>))<%= blockName %>;',
      ARG: '^<%= omitReturnType(returnType) %><%= omitParameters(parameters) %>{}',
      TYPE: 'typedef <%= returnType %> (^<%= typeName %>)(<%= join(parameterTypes) %>);\n<%= typeName %> <%= blockName %> = ^<%= omitReturnType(returnType) %><%= omitParameters(parameters) %>{};',
      WEAK: '__weak typeof(self) weakSelf = self;',
      STRONG: '__strong typeof(weakSelf) strongSelf = weakSelf;',
    };
    _.each(templates, function(v, k, l) { l[k] = _.template(v) });

    var placeholders = {
      LOCAL: '<%= answer %>',
      PROP: '@property (nonatomic, copy) <%= answer %>',
      PARAM: '- (void)doSomethingWithBlock:<%= answer %>',
      ARG: '[someObject doSomethingWithBlock:<%= answer %>];',
      TYPE: '<%= answer %>',
      WEAK: '<%= answer %>',
      STRONG: '<%= answer %>',
    };
    _.each(placeholders, function(v, k, l) { l[k] = _.template(v) });
  
    /* Private functions */
    function typeName(context) {
      var name = '';
      if (context == contexts.TYPE) {
        name = 'testType';
      } else {
        name = '-';
      }
      return name;
    } 

    function blockName() {
      var name = '';
      name = 'block';
      return name;
    } 
    
    /* Static properties */
    Question.contexts = angular.copy(contexts);
   
    return Question;
  });

