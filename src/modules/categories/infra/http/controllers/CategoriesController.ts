import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateCategoryService from '@modules/categories/services/CreateCategoryService';

export default class CategoriesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, slug } = request.body;

    const createCategoryService = container.resolve(CreateCategoryService);

    const category = await createCategoryService.execute({ name, slug });

    return response.json(category);
  }
}
