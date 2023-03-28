import { SemanticTokenTypes } from 'vscode-languageserver';
import { AstNode, AbstractSemanticTokenProvider, SemanticTokenAcceptor } from 'langium';
import { isArguments, isAttribute, isAttributeEntry, isField, isParameter, isPattern, isVariableAccess } from './generated/ast';

export class SeedwingDogmaSemanticTokenProvider extends AbstractSemanticTokenProvider {

    protected highlightElement(node: AstNode, acceptor: SemanticTokenAcceptor): void {
        if (isPattern(node)) {
            acceptor({
                node,
                property: 'name',
                type: SemanticTokenTypes.struct,
            });
        } else if (isField(node)) {
            acceptor({
                node,
                property: 'name',
                type: SemanticTokenTypes.property,
            });
            acceptor({
                node,
                property: 'optional',
                type: SemanticTokenTypes.modifier,
            })
        } else if (isArguments(node)) {
            acceptor({
                node,
                property: 'arguments',
                type: SemanticTokenTypes.typeParameter,
            });
        } else if (isAttribute(node)) {
            acceptor({
                node,
                property: 'name',
                type: SemanticTokenTypes.decorator,
            });
        } else if (isAttributeEntry(node)) {
            acceptor({
                node,
                property: 'name',
                type: SemanticTokenTypes.property,
            });
        } else if (isParameter(node)) {
            acceptor({
                node,
                property: 'deref',
                type: SemanticTokenTypes.operator,
            })
        } else if (isVariableAccess(node)) {
            if (node.$cstNode) {
                acceptor({
                    cst: node.$cstNode,
                    type: SemanticTokenTypes.variable,
                })
            }
        }
    }
} 