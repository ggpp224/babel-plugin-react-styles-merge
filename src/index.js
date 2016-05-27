
export default function ({ types: t }) {

    function isJSXAttributeOfName(attr, name) {
        return t.isJSXAttribute(attr) && t.isJSXIdentifier(attr.name, { name: name });
    }

    function getAttributeValue(attr) {
        var value = attr.value;
        if (!value) return t.identifier("true");
        if (t.isJSXExpressionContainer(value)) value = value.expression;
        return value;
    }

    return {
        visitor: {
            JSXElement: function JSXElement(path) {

                path.traverse({
                    JSXAttribute: function (path) {

                        if(path.node.name.name === 'styles'){
                            var attr = path.node;
                            var val = getAttributeValue(attr)
                            if(val.elements){
                                var attrs = path.parent.attributes||[];
                                var styleAttr = null;
                                attrs.forEach(function (item,idx) {
                                    if(item.name.name === 'style'){
                                        styleAttr = attrs.splice(idx,1);
                                        return;
                                    }
                                })

                                var objs = [t.objectExpression([])].concat(val.elements);
                                if(styleAttr && styleAttr.length>0){
                                    objs = [t.objectExpression([])].concat(getAttributeValue(styleAttr[0]),val.elements);
                                }

                                path.node.value = t.jSXExpressionContainer(
                                    t.callExpression(t.memberExpression(
                                        t.identifier('Object'),
                                        t.identifier('assign')
                                        ),
                                        objs
                                    )
                                );

                                path.node.name.name = 'style';
                            }

                        }

                    }
                })


            }
        }
    };

}
