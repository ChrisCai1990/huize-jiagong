import { login } from "@/app/actions";

interface Props {
  searchParams: Promise<{ error?: string }>;
}

export default async function LoginPage({ searchParams }: Props) {
  const { error } = await searchParams;

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-green-700 rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-xl font-bold">汇</span>
          </div>
          <h1 className="text-xl font-semibold text-slate-800">汇泽内容工厂</h1>
          <p className="text-sm text-slate-500 mt-1">内容管理后台</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
          <form action={login} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                管理密码
              </label>
              <input
                type="password"
                name="password"
                required
                autoFocus
                placeholder="请输入密码"
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
              />
            </div>
            {error && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                密码错误，请重试
              </p>
            )}
            <button
              type="submit"
              className="w-full bg-green-700 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-green-800 transition-colors"
            >
              进入后台
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
