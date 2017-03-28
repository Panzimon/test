/**
 * ����֤
 * 
 * @param {Object} rules ��֤�ֶεĹ���
 * @param {Object} messages ��֤�ֶε���ʾ��Ϣ
 * 
 */
class WxValidate {
	constructor(rules = {}, messages = {}) {
		Object.assign(this, {
			rules, 
			messages, 
		})
		this.__init()
	}

	/**
	 * __init
	 */
	__init() {
		this.__initMethods()
		this.__initDefaults()
		this.__initData()
	}

	/**
	 * ��ʼ������
	 */
	__initData() {
		this.form = {}
		this.errorList = []
	}

	/**
	 * ��ʼ��Ĭ����ʾ��Ϣ
	 */
	__initDefaults() {
		this.defaults = {
			messages: {
				required: '���Ǳ����ֶΡ�',
				email: '��������Ч�ĵ����ʼ���ַ��',
				tel: '������11λ���ֻ����롣',
				url: '��������Ч����ַ��',
				date: '��������Ч�����ڡ�',
				dateISO: '��������Ч�����ڣ�ISO�������磺2009-06-23��1998/01/22��',
				number: '��������Ч�����֡�',
				digits: 'ֻ���������֡�',
				idcard: '������18λ����Ч���֤��',
				equalTo: this.formatTpl('����ֵ����� {0} ��ͬ��'),
				contains: this.formatTpl('����ֵ������� {0}��'),
				minlength: this.formatTpl('����Ҫ���� {0} ���ַ���'),
				maxlength: this.formatTpl('���������� {0} ���ַ���'),
				rangelength: this.formatTpl('�����볤���� {0} �� {1} ֮����ַ���'),
				min: this.formatTpl('�����벻С�� {0} ����ֵ��'),
				max: this.formatTpl('�����벻���� {0} ����ֵ��'),
				range: this.formatTpl('�����뷶Χ�� {0} �� {1} ֮�����ֵ��'),
			}
		}
	}

	/**
	 * ��ʼ��Ĭ����֤����
	 */
	__initMethods() {
		const that = this
		that.methods = {
			/**
			 * ��֤����Ԫ��
			 */
			required(value, param) {
				if (!that.depend(param)) {
					return 'dependency-mismatch'
				} else if (typeof value === 'number') {
					value = value.toString()
				} else if (typeof value === 'boolean') {
					return !0
				}

				return value.length > 0
			},
			/**
			 * ��֤���������ʽ
			 */
			email(value) {
				return that.optional(value) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value)
			},
			/**
			 * ��֤�ֻ���ʽ
			 */
			tel(value) {
				return that.optional(value) || /^1[34578]\d{9}$/.test(value)
			},
			/**
			 * ��֤URL��ʽ
			 */
			url(value) {
				return that.optional(value) || /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value)
			},
			/**
			 * ��֤���ڸ�ʽ
			 */
			date(value) {
				return that.optional(value) || !/Invalid|NaN/.test(new Date(value).toString())
			},
			/**
			 * ��֤ISO���͵����ڸ�ʽ
			 */
			dateISO(value) {
				return that.optional(value) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value)
			},
			/**
			 * ��֤ʮ��������
			 */
			number(value) {
				return that.optional(value) || /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value)
			},
			/**
			 * ��֤����
			 */
			digits(value) {
				return that.optional(value) || /^\d+$/.test(value)
			},
			/**
			 * ��֤���֤����
			 */
			idcard(value) {
				return that.optional(value) || /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(value)
			},
			/**
			 * ��֤���������������Ƿ���ͬ
			 */
			equalTo(value, param) {
				return that.optional(value) || value === that.scope.detail.value[param]
			},
			/**
			 * ��֤�Ƿ����ĳ��ֵ
			 */
			contains(value, param) {
				return that.optional(value) || value.indexOf(param) >= 0
			},
			/**
			 * ��֤��С����
			 */
			minlength(value, param) {
				return that.optional(value) || value.length >= param
			},
			/**
			 * ��֤��󳤶�
			 */
			maxlength(value, param) {
				return that.optional(value) || value.length <= param
			},
			/**
			 * ��֤һ�����ȷ�Χ[min, max]
			 */
			rangelength(value, param) {
				return that.optional(value) || (value.length >= param[0] && value.length <= param[1])
			},
			/**
			 * ��֤��Сֵ
			 */
			min(value, param) {
				return that.optional(value) || value >= param
			},
			/**
			 * ��֤���ֵ
			 */
			max(value, param) {
				return that.optional(value) || value <= param
			},
			/**
			 * ��֤һ��ֵ��Χ[min, max]
			 */
			range(value, param) {
				return that.optional(value) || (value >= param[0] && value <= param[1])
			},
		}
	}

	/**
	 * ����Զ�����֤����
	 * @param {String} name ������
	 * @param {Function} method �����壬������������(value, param)��value��ʾԪ�ص�ֵ��param��ʾ����
	 * @param {String} message ��ʾ��Ϣ
	 */
	addMethod(name, method, message) {
		this.methods[name] = method
		this.defaults.messages[name] = message !== undefined ? message : this.defaults.messages[name]
	}

	/**
	 * �ж���֤�����Ƿ����
	 */
	isValidMethod(value) {
		let methods = []
		for(let method in this.methods) {
			if (method && typeof this.methods[method] === 'function') {
				methods.push(method)
			}
		}
		return methods.indexOf(value) !== -1
	}

	/**
	 * ��ʽ����ʾ��Ϣģ��
	 */
	formatTpl(source, params) {
		const that = this
		if (arguments.length === 1) {
			return function() {
				let args = Array.from(arguments)
				args.unshift(source)
				return that.formatTpl.apply(this, args)
			}
		}
		if (params === undefined) {
			return source
		}
		if (arguments.length > 2 && params.constructor !== Array) {
			params = Array.from(arguments).slice(1)
		}
		if (params.constructor !== Array) {
			params = [ params ]
		}
		params.forEach(function(n, i) {
			source = source.replace(new RegExp("\\{" + i + "\\}", "g"), function() {
				return n
			})
		})
		return source
	}

	/**
	 * �жϹ��������Ƿ����
	 */
	depend(param) {
		switch(typeof param) {
			case 'boolean':
				param = param
				break
			case 'string':
				param = !!param.length
				break
			case 'function':
				param = param()
			default:
				param = !0
		}
		return param
	}

	/**
	 * �ж�����ֵ�Ƿ�Ϊ��
	 */
	optional(value) {
		return !this.methods.required(value) && 'dependency-mismatch'
	}

	/**
	 * ��ȡ�Զ����ֶε���ʾ��Ϣ
	 * @param {String} param �ֶ���
	 * @param {Object} rule ����
	 */
	customMessage(param, rule) {
		const params = this.messages[param]
		const isObject = typeof params === 'object'
		if (params && isObject) return params[rule.method]
	}

	/**
	 * ��ȡĳ��ָ���ֶε���ʾ��Ϣ
	 * @param {String} param �ֶ���
	 * @param {Object} rule ����
	 */
	defaultMessage(param, rule) {
		let message = this.customMessage(param, rule) || this.defaults.messages[rule.method]
		let type = typeof message
		
		if (type === 'undefined') {
			message = `Warning: No message defined for ${rule.method}.`
		} else if (type === 'function') {
			message = message.call(this, rule.parameters)
		}

		return message
	}

	/**
	 * ���������Ϣ
	 * @param {String} param �ֶ���
	 * @param {Object} rule ����
	 * @param {String} value Ԫ�ص�ֵ
	 */
	formatTplAndAdd(param, rule, value) {
		let msg = this.defaultMessage(param, rule)

		this.errorList.push({
			param: param, 
			msg: msg, 
			value: value, 
		})
	}

	/**
	 * ��֤ĳ��ָ���ֶεĹ���
	 * @param {String} param �ֶ���
	 * @param {Object} rules ����
	 * @param {Object} event �����ݶ���
	 */
	checkParam(param, rules, event) {

		// ��������ݶ���
		this.scope = event

		// �����ֶζ�Ӧ��ֵ
		const data = event.detail.value
		const value = data[param] || ''

		// ����ĳ��ָ���ֶε����й���������֤���򣬷��򻺴������Ϣ
		for(let method in rules) {

			// �ж���֤�����Ƿ����
			if (this.isValidMethod(method)) {

				// �����������Լ�ֵ
				const rule = { 
					method: method, 
					parameters: rules[method] 
				}

				// ������֤����
				const result = this.methods[method](value, rule.parameters)
				
				// ��result����ֵΪdependency-mismatch����˵�����ֶε�ֵΪ�ջ�Ǳ����ֶ�
				if (result === 'dependency-mismatch') {
					continue
				}

				this.setValue(param, method, result, value)

				// �ж��Ƿ�ͨ����֤�����򻺴������Ϣ������ѭ��
				if (!result) {
					this.formatTplAndAdd(param, rule, value)
					break
				}
			}
		}
	}

	/**
	 * �����ֶε�Ĭ����ֵ֤
	 * @param {String} param �ֶ���
	 */
	setView(param) {
		this.form[param] = {
			$name: param, 
			$valid: true, 
			$invalid: false, 
			$error: {}, 
			$success: {}, 
			$viewValue: ``, 
		}
	}

	/**
	 * �����ֶε���ֵ֤
	 * @param {String} param �ֶ���
	 * @param {String} method �ֶεķ���
	 * @param {Boolean} result �Ƿ�ͨ����֤
	 * @param {String} value �ֶε�ֵ
	 */
	setValue(param, method, result, value) {
		const params = this.form[param]
		params.$valid = result
		params.$invalid = !result
		params.$error[method] = !result
		params.$success[method] = result
		params.$viewValue = value
	}

	/**
	 * ��֤�����ֶεĹ��򣬷�����֤�Ƿ�ͨ��
	 * @param {Object} event �����ݶ���
	 */
	checkForm(event) {
		this.__initData()

		for (let param in this.rules) {
			this.setView(param)
			this.checkParam(param, this.rules[param], event)
		}

		return this.valid()
	}

	/**
	 * ������֤�Ƿ�ͨ��
	 */
	valid() {
		return this.size() === 0
	}

	/**
	 * ���ش�����Ϣ�ĸ���
	 */
	size() {
		return this.errorList.length
	}

	/**
	 * �������д�����Ϣ
	 */
	validationErrors() {
		return this.errorList
	}
}

export default WxValidate