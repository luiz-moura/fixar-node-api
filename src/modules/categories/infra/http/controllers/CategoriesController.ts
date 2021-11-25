import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateCategoryService from '@modules/categories/services/CreateCategoryService';
import ListCategoriesService from '@modules/categories/services/ListCategoriesService';
import UpdateCategoryService from '@modules/categories/services/UpdateCategoryService';
import ShowCategoryService from '@modules/categories/services/ShowCategoryService';

export default class CategoriesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listCategories = container.resolve(ListCategoriesService);

    const categories = await listCategories.execute();

    return response.json(classToClass(categories));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { category_id } = request.params;
    const showCategory = container.resolve(ShowCategoryService);

    const category = await showCategory.execute({
      category_id,
    });

    return response.json(classToClass(category));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, slug } = request.body;

    const createCategoryService = container.resolve(CreateCategoryService);

    const category = await createCategoryService.execute({ name, slug });

    return response.json(classToClass(category));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { category_id } = request.params;
    const { name, slug } = request.body;

    const updateCategoryService = container.resolve(UpdateCategoryService);

    const category = await updateCategoryService.execute({
      category_id,
      name,
      slug,
    });

    return response.json(classToClass(category));
  }
}
