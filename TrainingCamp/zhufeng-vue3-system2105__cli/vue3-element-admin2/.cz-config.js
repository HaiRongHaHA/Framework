const EMOJI_TYPES = {
	feat: 'feat',
	fix: 'fix',
	docs: 'docs',
	style: 'style',
	refactor: 'refactor',
	perf: 'perf',
	test: 'test',
	revert: 'revert',
	build: 'build',
	chore: 'chore',
	ci: 'ci',
}

module.exports = {
	types: [
		{
			value: EMOJI_TYPES.feat,
			name: 'feat: 新功能'
		},
		{
			value: EMOJI_TYPES.fix,
			name: 'fix: 修复bug'
		},
		{
			value: EMOJI_TYPES.docs,
			name: 'docs: 文档变更'
		},
		{
			value: EMOJI_TYPES.style,
			name: 'style: 代码的样式美化'
		},
		{
			value: EMOJI_TYPES.refactor,
			name: 'refactor: 重构'
		},
		{
			value: EMOJI_TYPES.perf,
			name: 'perf: 性能优化'
		},
		{
			value: EMOJI_TYPES.test,
			name: 'test: 测试'
		},
		{
			value: EMOJI_TYPES.revert,
			name: 'revert: 回退'
		},
		{
			value: EMOJI_TYPES.build,
			name: 'build: 打包'
		},
		{
			value: EMOJI_TYPES.chore,
			name: 'chore: 构建/工程依赖/工具'
		},
		{
			value: EMOJI_TYPES.ci,
			name: 'ci: CI 配置'
		}
	],
	allowCustomScopes: true,
	scopeOverrides: {
		[EMOJI_TYPES.feat]: [
			{ name: 'components' },
			{ name: 'hooks' },
			{ name: 'utils' },
			{ name: 'styles' },
			{ name: 'init' },
			{ name: 'other' }
		],
		[EMOJI_TYPES.fix]: [
			{ name: 'merge' },
			{ name: 'style' },
			{ name: 'bug' },
			{ name: 'e2eTest' },
			{ name: 'unitTest' }
		]
	},
	messages: {
		type: '请选择提交类型(必填)',
		scope: ['请输入文件修改范围(可选)'],
		customScope: '请输入自定义的 scope(可选)',
		subject: '请简要描述提交(必填)',
		body: '请输入详细描述(可选)，使用 "|" 换行',
		breaking: '列出任何BREAKING CHANGES(可选)',
		footer: '请输入要关闭的issue(可选)',
		confirmCommit: '确定提交此commit吗？'
	},
	allowBreakingChanges: [EMOJI_TYPES.feat, EMOJI_TYPES.fix],
	subjectLimit: 72
};
