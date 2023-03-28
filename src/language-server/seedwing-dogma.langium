grammar SeedwingDogma

entry CompilationUnit:
    (patterns+=Pattern)*;

Pattern:
    (attributes+=Attribute)*
    'pattern' name=ID (arguments=Arguments)? '=' definition=PatternDefinition;

PatternDefinition:
    SimplePatternDefinition |
    And |
    Or;

// all the non-recursive variants
SimplePatternDefinition:
    PatternReference |
    ObjectDefinition |
    ListDefinition |
    BooleanLiteral |
    BooleanType |
    StringLiteral |
    StringType |
    IntegerLiteral |
    IntegerType |
    DecimalLiteral |
    DecimalType |
    Anything |
    LocalPatternReference |
    Expression
;

Arguments:
    '<' ( (arguments+=Argument) (',' (arguments+=Argument)?)* )? '>'
;

Argument:
    name=ID
;

LocalPatternReference:
    ref=[Pattern:ID] (parameters=Parameters)? (refinement=Refinement)?;

PatternReference:
    (package+=ID '::')+ ref=ID (parameters=Parameters)? (refinement=Refinement)?;

Parameters:
    '<' ( (parameters+=Parameter) (',' (parameters+=Parameter)?)* )? '>'
;

Parameter:
    (deref?='*')? PatternDefinition
;

Refinement:
    '(' refinements=PatternDefinition ')'
;

ObjectDefinition:
    '{' ( (fields+=Field) (',' (fields+=Field)?)* )? '}'
;

Field:
    (attributes+=Attribute)*
    name=ID (optional?='?')? ':' definition=PatternDefinition
;

ListDefinition:
    '['  ( (entries+=PatternDefinition) (',' (entries+=PatternDefinition)?)* )? ']'
;

StringLiteral:
    value=STRING
;

StringType:
    {infer StringType} 'string'
;

BooleanLiteral:
    value='true' | value='false'
;

BooleanType:
    {infer BooleanType} 'boolean'
;

IntegerLiteral:
    value=INT
;

IntegerType:
    {infer IntegerType} 'integer'
;

DecimalLiteral:
    value=INT '.' INT
;

DecimalType:
    {infer DecimalType} 'decimal'
;

Anything:
    {infer Anything} 'anything'
;

And:
    SimplePatternDefinition ( '&&' right=PatternDefinition )
;

Or:
    SimplePatternDefinition ( '||' right=PatternDefinition )
;

Attribute:
    '#[' name=ID
        ( '('
            ( (entries+=AttributeEntry) (',' (entries+=AttributeEntry)? )* )?
        ')' )?
    ']'
;

AttributeEntry:
    (name=ID | name=STRING ) ( '=' value=AttributeValue )?
;

AttributeValue:
    value=ID | value=STRING
;

Expression:
    '$(' (expression=CommonExpression)? ')'
;

CommonExpression:
    OpExpression | SimpleExpression
;

OpExpression:
    SimpleExpression ('>' | '<') right=CommonExpression
;

SimpleExpression:
    DecimalLiteral | IntegerLiteral | StringLiteral | BooleanLiteral |
    VariableAccess
;

VariableAccess:
    {infer VariableAccess} ( (ID '.')* ID )
;

hidden terminal WS: /\s+/;

terminal ID: /[_a-zA-Z][\w_-]*/;
terminal INT returns number: /[0-9]+/;
terminal STRING: /"(\\.|[^"\\])*"|'(\\.|[^'\\])*'/;


hidden terminal ML_COMMENT: /\/\*[\s\S]*?\*\//;
hidden terminal SL_COMMENT: /\/\/[^\n\r]*/;
